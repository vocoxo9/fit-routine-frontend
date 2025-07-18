import { useEffect, useState } from 'react';

import Category from 'components/common/Category/Category';
import DayRoutine from 'components/recommend/DayRoutine/DayRoutine';
import OpenDataCheckList from 'components/recommend/OpenDataCheckList/OpenDataCheckList';

import styles from './RoutineRecommendForm.module.css';
import button from 'assets/styles/common/button.module.css';
import error from 'assets/styles/common/error.module.css';
import {
    fetchExerciseRandomRoutine,
    fetchExerciseOpenDataList,
    fetchGetExerciseById,
} from 'utils/api/exerciseApi';
import {
    calcDailyBurnKcal,
    calcExerciseTotalCalorie,
} from 'utils/helpers/calculator';
import { successAlert, warningAlert } from 'utils/helpers/toastUtils';

const CATEGORY_LIST = [
    { text: '상체', value: 'UPPER' },
    { text: '하체', value: 'LOWER' },
    { text: '유산소', value: 'CARDIO' },
    { text: '생활운동', value: 'LIFE' },
];

function RoutineRecommendForm({
    paramTodoId,
    goToNext,
    formData,
    memberDetail,
    exerciseList,
    buttonText,
}) {
    const [data, setData] = useState([]);
    const [openDataList, setOpenDataList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [showCategory, setShowCategory] = useState({});
    const [showCheckList, setShowCheckList] = useState({});
    const [selectedCategory, setSelectCategory] = useState({});

    // kcal 상태 추가
    const [dailyKcal, setDailyKcal] = useState({});
    const [dailyBurnKcal, setDailyBurnKcal] = useState(0);

    // 렌더링 동시에 운동 공공데이터 가져오기
    useEffect(() => {
        const loadOpenData = async () => {
            const exerciseOpenData = await fetchExerciseOpenDataList(formData);
            setOpenDataList(exerciseOpenData);
        };
        loadOpenData();
    }, []);

    // 렌더링과 동시에 가져 올 데이터 샘플 및 초기 kcal 계산
    useEffect(() => {
        const loadInitialRoutine = async () => {
            const routineData = paramTodoId
                ? exerciseList
                : await fetchExerciseRandomRoutine(formData);

            // 초기에 체크 상태일 데이터 리스트
            const initialCheckedData = {};
            routineData.exerciseList?.forEach((exercise, index) => {
                initialCheckedData[index + 1] = exercise;
            });
            setCheckedItems(initialCheckedData);

            // 운동 id를 운동 객체로
            const routinePerDay = await Promise.all(
                Array.from({ length: formData.dayRepeat }, async (_, i) => {
                    const dayRepeat = i + 1;
                    const exerciseIds = initialCheckedData[dayRepeat] || [];

                    const exercises = await Promise.all(
                        exerciseIds.map(async (id) => {
                            const exerciseDetail =
                                await fetchGetExerciseById(id);
                            return exerciseDetail;
                        }),
                    );

                    return {
                        weight: memberDetail.weight || 60,
                        dayRepeat: dayRepeat,
                        exerciseList: exercises.filter(Boolean),
                    };
                }),
            );
            setData(routinePerDay);

            // 초기 kcal 계산 및 dailyKcal 설정
            const initialDailyKcal = {};
            routinePerDay.forEach((dayRoutine) => {
                const dayRepeat = dayRoutine.dayRepeat;
                const weight = memberDetail.weight || 60;
                initialDailyKcal[dayRepeat] = calcExerciseTotalCalorie(
                    dayRoutine.exerciseList,
                    weight,
                );
            });
            setDailyKcal(initialDailyKcal);

            if (formData.purpose === 'DIET') {
                setDailyBurnKcal(
                    calcDailyBurnKcal(
                        memberDetail.weight,
                        formData.goalWeight,
                        formData.startedAt,
                        formData.endedAt,
                    ),
                );
            }
        };

        loadInitialRoutine();
    }, [formData.dayRepeat, memberDetail]);

    // 카테고리 표시
    const handleShowCategory = (dayRepeat) => {
        setShowCategory((prev) => ({ ...prev, [dayRepeat]: !prev[dayRepeat] }));
        setShowCheckList((prev) => ({ ...prev, [dayRepeat]: false }));
    };

    // 체크리스트 표시
    const handleShowCheckList = (dayRepeat, category) => {
        setSelectCategory((prev) => ({ ...prev, [dayRepeat]: category }));
        setShowCheckList((prev) => ({ ...prev, [dayRepeat]: true }));
    };

    // 카테고리에 따른 리스트 분류
    const filteredByCategory = (dayRepeat) => {
        const category = selectedCategory[dayRepeat];

        return category && Array.isArray(openDataList)
            ? openDataList.filter(
                  (opendata) =>
                      opendata.category && opendata.category === category.value,
              )
            : [];
    };

    // 체크박스 상태를 변경하고 칼로리를 계산
    const handleCheckBoxClick = async (dayRepeat, exerciseId) => {
        let items = checkedItems[dayRepeat] || [];

        let updateCheckedItems;
        if (items.includes(exerciseId)) {
            updateCheckedItems = items.filter((id) => id !== exerciseId);
        } else {
            updateCheckedItems = [...items, exerciseId];
        }
        setCheckedItems((prev) => ({
            ...prev,
            [dayRepeat]: updateCheckedItems,
        }));

        const updatedExerciseList = await Promise.all(
            updateCheckedItems.map(async (id) => {
                const exerciseDetail = openDataList.find((ex) => ex.id === id);
                return exerciseDetail || (await fetchGetExerciseById(id));
            }),
        );

        setData((prevData) => {
            const newData = prevData.map((dayData) => {
                if (dayData.dayRepeat === dayRepeat) {
                    return {
                        ...dayData,
                        exerciseList: updatedExerciseList.filter(Boolean),
                    };
                }
                return dayData;
            });

            const newDailyKcal = {};
            newData.forEach((dayData) => {
                const weight = memberDetail.weight;
                newDailyKcal[dayData.dayRepeat] = calcExerciseTotalCalorie(
                    dayData.exerciseList,
                    weight,
                );
            });
            setDailyKcal(newDailyKcal);
            return newData;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const day of data) {
            const dayRepeat = day.dayRepeat;
            const oneDayKcal = dailyKcal[dayRepeat] || 0;

            if (!checkedItems[dayRepeat]?.length) {
                warningAlert(`${dayRepeat}일차에 선택된 운동이 존재하지 않습니다.`);
                return;
            }

            if (formData.purpose === 'DIET' && oneDayKcal < dailyBurnKcal) {
                warningAlert(`${dayRepeat}일차 칼로리가 부족합니다.`);
                return;
            }
        }

        const selectedExerciseIds = [];
        for (let i = 1; i <= Number(formData.dayRepeat); i++) {
            selectedExerciseIds.push(checkedItems[i] || []);
        }

        goToNext(selectedExerciseIds);
        successAlert('루틴을 등록하였습니다!');
    };

    return (
        <form className={styles.container}>
            <p className={styles.title}>FIT-ROUTINE</p>
            {data.map((dayData, index) => {
                const dayRepeat = dayData.dayRepeat;
                const oneDayKcal = dailyKcal[dayRepeat] || 0;
                return (
                    <div key={`${dayRepeat}_${index}`}>
                        <DayRoutine
                            data={dayData}
                            onClick={() => handleShowCategory(dayRepeat)}
                            checkedItems={checkedItems[dayRepeat]}
                            kcal={oneDayKcal}
                            handleCheckBoxClick={(exerciseId) =>
                                handleCheckBoxClick(dayRepeat, exerciseId)
                            }
                        />

                        {formData.purpose === 'DIET' &&
                            oneDayKcal < dailyBurnKcal && (
                                <div className={styles.message}>
                                    <p className={error.error}>
                                        칼로리가 부족합니다.
                                    </p>
                                    <p className={styles.burnKcal}>
                                        {oneDayKcal} /{dailyBurnKcal}
                                    </p>
                                </div>
                            )}

                        {showCategory[dayRepeat] && (
                            <div className={styles.category}>
                                {CATEGORY_LIST.map((category, index) => (
                                    <Category
                                        key={`${category.name}_${index}`}
                                        text={category.text}
                                        name={category.name}
                                        value={category.value}
                                        onClick={() =>
                                            handleShowCheckList(
                                                dayRepeat,
                                                category,
                                            )
                                        }
                                        isSelected={
                                            selectedCategory[dayRepeat] ===
                                            category
                                        }
                                    />
                                ))}
                            </div>
                        )}

                        {showCheckList[dayRepeat] && (
                            <OpenDataCheckList
                                dayRepeat={dayRepeat}
                                checkedItems={checkedItems[dayRepeat]}
                                openDataList={filteredByCategory(dayRepeat)}
                                handleCheckBoxClick={(exerciseId) =>
                                    handleCheckBoxClick(dayRepeat, exerciseId)
                                }
                            />
                        )}
                    </div>
                );
            })}
            <button
                className={`${button.button} ${button.bold} ${styles.registButton}`}
                onClick={handleSubmit}>
                {buttonText}
            </button>
        </form>
    );
}

export default RoutineRecommendForm;
