import { useEffect, useState } from 'react';

import Category from 'components/common/Category/Category';
import DayRoutine from 'components/recommend/DayRoutine/DayRoutine';
import CategoryForm from 'components/recommend/CategoryForm/CategoryForm';

import styles from './RecommendExercise.module.css';
import button from 'assets/styles/common/button.module.css';
import error from 'assets/styles/common/error.module.css';
import {
    fetchExerciseRandomRoutine,
    fetchExerciseOpenDataList,
    fetchGetExerciseById,
} from 'utils/api/exerciseApi';

const DAILY_BURN_KCAL = 400; // 하루 소모 칼로리(임의)
const EXERCISE_TIME = 0.25; // 운동 시간
const calculateCarolie = (exerciseList, weight) => {
    return exerciseList.reduce((total, exercise) => {
        return total + exercise.met * weight * EXERCISE_TIME;
    }, 0);
};

function RecommendExercise({ goToNext, formData, setFormData }) {
    const [data, setData] = useState([]);
    const [openDataList, setOpenDataList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [showCategory, setShowCategory] = useState({});
    const [showCheckList, setShowCheckList] = useState({});
    const [selectedCategory, setSelectCategory] = useState({});

    // kcal 상태 추가
    const [dailyKcal, setDailyKcal] = useState({});

    const categoryList = [
        { text: '상체', name: 'UPPER', value: 'UPPER' },
        { text: '하체', name: 'LOWER', value: 'LOWER' },
        { text: '유산소', name: 'CARDIO', value: 'CARDIO' },
        { text: '생활운동', name: 'LIFE', value: 'LIFE' },
        { text: '상체', name: 'UPPER', value: 'UPPER' },
        { text: '하체', name: 'LOWER', value: 'LOWER' },
        { text: '유산소', name: 'CARDIO', value: 'CARDIO' },
        { text: '생활운동', name: 'LIFE', value: 'LIFE' },
    ];

    // 렌더링 동시에 운동 공공데이터 가져오기
    useEffect(() => {
        const fetchOpenData = async () => {
            const exerciseOpenData = await fetchExerciseOpenDataList();
            setOpenDataList(exerciseOpenData);
        };
        fetchOpenData();
    }, []);

    // 렌더링과 동시에 가져 올 데이터 샘플 및 초기 kcal 계산
    useEffect(() => {
        const getInitialRoutine = async () => {
            const routineData = await fetchExerciseRandomRoutine(formData);

            // 초기에 체크 상태일 데이터 리스트
            const initialCheckedData = {};
            routineData.exerciseList.forEach((exercise, index) => {
                initialCheckedData[index + 1] = exercise;
            });
            setCheckedItems(initialCheckedData);

            // 🌟운동 id를 운동 객체로
            const transformedInitialData = await Promise.all(
                Array.from({ length: formData.dayRepeat }, async (_, i) => {
                    const dayRepeat = i + 1;
                    const exerciseIdForDay =
                        initialCheckedData[dayRepeat] || [];

                    const exerciseObjectsForDay = await Promise.all(
                        exerciseIdForDay.map(async (id) => {
                            const exerciseDetail =
                                await fetchGetExerciseById(id);
                            return exerciseDetail;
                        }),
                    );

                    return {
                        wieght: 60,
                        dayRepeat: dayRepeat,
                        exerciseList: exerciseObjectsForDay.filter(Boolean),
                    };
                }),
            );
            setData(transformedInitialData);

            // 초기 kcal 계산 및 dailyKcal 설정
            const initialDailyKcal = {};
            transformedInitialData.forEach((dayRoutine) => {
                const dayRepeat = dayRoutine.dayRepeat;
                const weight = 60;
                initialDailyKcal[dayRepeat] = calculateCarolie(
                    dayRoutine.exerciseList,
                    weight,
                );
            });
            setDailyKcal(initialDailyKcal);
        };
        getInitialRoutine();
    }, [formData.dayRepeat]);

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
                const weight = 60;
                newDailyKcal[dayData.dayRepeat] = calculateCarolie(
                    dayData.exerciseList,
                    weight,
                );
            });
            setDailyKcal(newDailyKcal);
            return newData;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        for (const day of data) {
            const dayRepeat = day.dayRepeat;
            const oneDayKcal = dailyKcal[dayRepeat] || 0;

            if (
                !checkedItems[dayRepeat] ||
                checkedItems[dayRepeat].length === 0
            ) {
                alert(`${dayRepeat}일차에 선택된 운동이 존재하지 않습니다.`);
                return;
            } else if (
                formData.purpose === 'diet' &&
                oneDayKcal < DAILY_BURN_KCAL
            ) {
                alert(`${dayRepeat}일차 칼로리가 부족합니다.`);
                return;
            }
        }

        const updateExerciseData = [];
        for (let i = 1; i <= Number(formData.dayRepeat); i++) {
            updateExerciseData.push(checkedItems[i] || []);
        }

        setFormData((prev) => ({
            ...prev,
            exerciseData: updateExerciseData,
        }));

        alert('폼 제출 완료');
        goToNext();
    };

    return (
        <form className={styles.container}>
            <p className={styles.title}>FIT-ROUTINE</p>
            {data.map((oneDayData, index) => {
                const dayRepeat = oneDayData.dayRepeat;
                const oneDayKcal = dailyKcal[dayRepeat] || 0;
                return (
                    <div key={`${dayRepeat}_${index}`}>
                        <DayRoutine
                            data={oneDayData}
                            onClick={() => handleShowCategory(dayRepeat)}
                            checkedItems={checkedItems[dayRepeat]}
                            kcal={oneDayKcal}
                            handleCheckBoxClick={(exerciseId) =>
                                handleCheckBoxClick(
                                    dayRepeat,
                                    exerciseId,
                                )
                            }
                        />

                        {formData.purpose === 'diet' &&
                            oneDayKcal < DAILY_BURN_KCAL && (
                                <div className={styles.message}>
                                    <p className={error.error}>
                                        칼로리가 부족합니다.
                                    </p>
                                    <p className={styles.burnKcal}>
                                        {oneDayKcal} /{DAILY_BURN_KCAL}
                                    </p>
                                </div>
                            )}

                        {showCategory[dayRepeat] && (
                            <div className={styles.category}>
                                {categoryList.map((category, index) => (
                                    <Category
                                        key={`${category}_${index}`}
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
                            <CategoryForm
                                dayRepeat={dayRepeat}
                                checkedItems={checkedItems[dayRepeat]}
                                openDataList={filteredByCategory(dayRepeat)}
                                handleCheckBoxClick={(exerciseId) =>
                                    handleCheckBoxClick(
                                        dayRepeat,
                                        exerciseId,
                                    )
                                }
                            />
                        )}
                    </div>
                );
            })}
            <button
                className={`${button.button} ${button.bold} ${styles.registButton}`}
                onClick={handleSubmit}>
                루틴 등록
            </button>
        </form>
    );
}

export default RecommendExercise;
