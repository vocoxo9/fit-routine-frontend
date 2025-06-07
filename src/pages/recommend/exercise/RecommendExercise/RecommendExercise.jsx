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
const handleCalculateCarolie = (exerciseList, weight) => {
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
        const fetchData = async () => {
            const routineData = await fetchExerciseRandomRoutine(formData);

            // 초기에 체크 상태일 데이터 리스트
            // ----> [1] 수정 후
            const initialCheckedData = {};
            routineData.exerciseList.forEach((exercise, index) => {
                initialCheckedData[index + 1] = exercise;
            });

            // setData(routineData);
            setCheckedItems(initialCheckedData);

            // [2] dayRepeat을 기준으로 배열 생성
            // 불러온 랜덤 데이터들을 하루에 10개씩 넣음
            const initialData = Array.from(
                { length: formData.dayRepeat },
                (_, i) => ({
                    dayRepeat: i + 1,
                    exerciseList: initialCheckedData[i + 1] || [],
                }),
            );
            setData(initialData);
            setFormData((prev) => ({
                ...prev,
                dayRepeat: initialData.dayRepeat,
                exerciseList: initialData.exerciseList,
            }));

            console.log(initialData);
            console.log(formData);
            // 초기 kcal 계산 및 dailyKcal 설정
            // [3] dailyKcal : [100, 200, 150, ... , 300]
            // ----> 수정 후
            const makeDailyKcal = async (exerciseList) => {
                const initialDailyKcal = await Promise.all(
                    exerciseList.map(async (exercise, index) => {
                        const dailyExercise = await Promise.all(
                            exercise.map(async (id) => {
                                const exerciseOpenData =
                                    await fetchGetExerciseById(id);
                                return exerciseOpenData;
                            }),
                        );
                        const weight = 60; // 추후 회원 기능 완료 후 적용 예정
                        console.log(
                            `%c${JSON.stringify(dailyExercise)}`,
                            'color:blue;',
                        );
                        return handleCalculateCarolie(dailyExercise, weight);
                    }),
                );
                console.log(
                    `%c${(initialDailyKcal, JSON.stringify(initialDailyKcal))}`,
                    'color:skyblue',
                );
                setDailyKcal(initialDailyKcal);
            };
            makeDailyKcal(routineData.exerciseList);
        };

        fetchData();
    }, []);

    // checkedItems 또는 data가 변경될 때마다 dailyKcal을 업데이트함
    useEffect(() => {
        const updatedDailyKcal = data.reduce((acc, oneDayData) => {
            const currentExerciseList = oneDayData.exerciseList.filter(
                (exercise) =>
                    checkedItems[oneDayData.dayNo]?.includes(exercise.id),
            );
            acc[oneDayData.dayNo] = handleCalculateCarolie(
                currentExerciseList,
                oneDayData.weight,
            );
            return acc;
        }, {});
        setDailyKcal(updatedDailyKcal);
    }, [data, checkedItems, openDataList]);

    // 카테고리 표시
    const handleShowCategory = (dayNo) => {
        setShowCategory((prev) => ({ ...prev, [dayNo]: !prev[dayNo] }));
        setShowCheckList((prev) => ({ ...prev, [dayNo]: false }));
    };

    // 체크리스트 표시
    const handleShowCheckList = (dayNo, category) => {
        setSelectCategory((prev) => ({ ...prev, [dayNo]: category }));
        setShowCheckList((prev) => ({ ...prev, [dayNo]: true }));
    };

    // 카테고리에 따른 리스트 분류
    const filteredByCategory = (dayNo) => {
        const category = selectedCategory[dayNo];

        return category && Array.isArray(openDataList)
            ? openDataList.filter(
                  (opendata) =>
                      opendata.category &&
                      opendata.category === category.value,
              )
            : [];
    };

    // 체크박스 변경
    const handleCheckBoxClick = (
        dayNo,
        exerciseId,
        oneDayData,
        openDataList,
        checkedItems,
        setCheckedItems,
    ) => {
        let items = checkedItems[dayNo] || [];

        let updateCheckedItems;

        // 이미 리스트에 있으면 제거
        if (items.includes(exerciseId)) {
            updateCheckedItems = items.filter((id) => id !== exerciseId);
        } else {
            // 리스트에 없으면 추가
            updateCheckedItems = [...items, exerciseId];
        }

        setCheckedItems((prev) => ({ ...prev, [dayNo]: updateCheckedItems }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        for (const day of data) {
            const dayNo = day.dayNo;
            const oneDayKcal = dailyKcal[dayNo] || 0;

            if (!checkedItems[dayNo] || checkedItems[dayNo].length === 0) {
                alert(`${dayNo}일차에 선택된 운동이 존재하지 않습니다.`);
                return;
            } else if (
                formData.purpose === 'diet' &&
                oneDayKcal < DAILY_BURN_KCAL
            ) {
                alert(`${dayNo}일차 칼로리가 부족합니다.`);
                return;
            }
        }

        const updateExerciseData = data.map((dayData) => {
            const currentExerciseList = (checkedItems[dayData.dayNo] || [])
                .map((id) => openDataList.find((ex) => ex.id === id))
                .filter(Boolean);
            return {
                ...dayData, // 기존 dayData 정보
                exerciseList: currentExerciseList, // 체크된 운동 리스트
                kcal: dailyKcal[dayData.dayNo], // 계산된 kcal
            };
        });

        setFormData((prev) => ({
            ...prev,
            exerciseData: updateExerciseData, // 최종 exerciseData를 저장
        }));

        alert('폼 제출 완료');
        goToNext();
    };

    return (
        <form className={styles.container}>
            <p className={styles.title}>FIT-ROUTINE</p>
            {data
                .filter((_, index) => index <= formData.dayRepeat)
                .map((oneDayData, index) => {
                    const dayNo = oneDayData.dayNo;
                    const oneDayKcal = dailyKcal[dayNo] || 0; // dailyKcal에서 해당 일차의 kcal 값을 가져옴

                    return (
                        <div key={`${dayNo}_${index}`}>
                            <DayRoutine
                                data={oneDayData}
                                onClick={() => handleShowCategory(dayNo)}
                                checkedItems={checkedItems[dayNo]}
                                kcal={oneDayKcal}
                                handleCheckBoxClick={(exerciseId) =>
                                    handleCheckBoxClick(
                                        dayNo,
                                        exerciseId,
                                        oneDayData,
                                        openDataList,
                                        checkedItems,
                                        setCheckedItems,
                                        setData,
                                    )
                                }
                            />

                            {formData.purpose === 'diet' &&
                                oneDayKcal < DAILY_BURN_KCAL && ( // dailyKcal 값을 사용
                                    <div className={styles.message}>
                                        <p className={error.error}>
                                            칼로리가 부족합니다.
                                        </p>
                                        <p className={styles.burnKcal}>
                                            {oneDayKcal} /{DAILY_BURN_KCAL}
                                        </p>
                                    </div>
                                )}

                            {showCategory[dayNo] && (
                                <div className={styles.category}>
                                    {categoryList.map((category, index) => (
                                        <Category
                                            key={`${category}_${index}`}
                                            text={category.text}
                                            name={category.name}
                                            value={category.value}
                                            onClick={() =>
                                                handleShowCheckList(
                                                    dayNo,
                                                    category,
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            )}

                            {showCheckList[dayNo] && (
                                <CategoryForm
                                    dayNo={dayNo}
                                    checkedItems={checkedItems[dayNo]}
                                    openDataList={filteredByCategory(dayNo)}
                                    handleCheckBoxClick={(exerciseId) =>
                                        handleCheckBoxClick(
                                            dayNo,
                                            exerciseId,
                                            oneDayData,
                                            openDataList,
                                            checkedItems,
                                            setCheckedItems,
                                            setData,
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
