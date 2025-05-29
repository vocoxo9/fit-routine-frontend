import { useEffect, useState } from 'react';

import Category from 'components/common/Category/Category';
import DayRoutine from 'components/recommend/DayRoutine/DayRoutine';
import CategoryForm from 'components/recommend/CategoryForm/CategoryForm';

import styles from './RecommendExercise.module.css';
import button from 'assets/styles/common/button.module.css';
import error from 'assets/styles/common/error.module.css';

const getMockData = () => [
    {
        todoNo: 1,
        repeatsDay: 3,
        templateNo: 1,
        dayNo: 1,
        kcal: 430,
        weight: 60,
        exerciseList: [
            { id: 1, name: '런지', met: 3, category: '근력' },
            { id: 2, name: '크런치', met: 4, category: '근력' },
            { id: 3, name: '걷기', met: 3, category: '생활운동' },
            { id: 4, name: '달리기', met: 3, category: '유산소' },
            { id: 5, name: '수영', met: 3.5, category: '유산소' },
            { id: 6, name: '줄넘기', met: 3, category: '유산소' },
            { id: 7, name: '등산', met: 3, category: '생활운동' },
        ],
    },
    {
        todoNo: 1,
        repeatsDay: 3,
        templateNo: 2,
        dayNo: 2,
        kcal: 346,
        weight: 60,
        exerciseList: [
            { id: 1, name: '런지', met: 3, category: '근력' },
            { id: 2, name: '크런치', met: 4, category: '근력' },
            { id: 3, name: '걷기', met: 3, category: '생활운동' },
            { id: 4, name: '달리기', met: 3, category: '유산소' },
            { id: 5, name: '수영', met: 3.5, category: '유산소' },
            { id: 6, name: '줄넘기', met: 3, category: '유산소' },
            { id: 7, name: '등산', met: 3, category: '생활운동' },
        ],
    },
    {
        todoNo: 1,
        repeatsDay: 3,
        templateNo: 3,
        dayNo: 3,
        kcal: 524,
        weight: 60,
        exerciseList: [
            { id: 1, name: '런지', met: 3, category: '근력' },
            { id: 2, name: '크런치', met: 4, category: '근력' },
            { id: 3, name: '걷기', met: 3, category: '생활운동' },
            { id: 4, name: '달리기', met: 3, category: '유산소' },
            { id: 5, name: '수영', met: 3.5, category: '유산소' },
            { id: 6, name: '줄넘기', met: 3, category: '유산소' },
            { id: 7, name: '등산', met: 3, category: '생활운동' },
        ],
    },
];

const getMockOpenData = () => [
    { id: 1, name: '런지', met: 3, category: '근력' },
    { id: 2, name: '크런치', met: 4, category: '근력' },
    { id: 3, name: '걷기', met: 3, category: '생활운동' },
    { id: 4, name: '달리기', met: 3, category: '유산소' },
    { id: 5, name: '수영', met: 3.5, category: '유산소' },
    { id: 6, name: '줄넘기', met: 3, category: '유산소' },
    { id: 7, name: '등산', met: 3, category: '생활운동' },
    { id: 8, name: '바벨 운동', met: 3, category: '근력' },
    { id: 9, name: '에어로빅', met: 3, category: '유산소' },
    { id: 10, name: '스쿼트', met: 3, category: '근력' },
    { id: 11, name: '계단 오르기', met: 3, category: '생활운동' },
    { id: 12, name: '벤치프레스', met: 3, category: '근력' },
    { id: 13, name: '플랭크', met: 3, category: '근력' },
    { id: 14, name: '레그프레스', met: 3, category: '근력' },
    { id: 15, name: '필라테스', met: 3, category: '유산소' },
];

const DAILY_BURN_KCAL = 400; // 하루 소모 칼로리(임의)
const EXERCISE_TIME = 0.5; // 운동 시간(임의)
const handleCalculateCarolie = (exerciseList, weight) => {
    return exerciseList.reduce((total, exercise) => {
        return total + exercise.met * weight * EXERCISE_TIME;
    }, 0);
};

function RecommendExercise() {
    const [data, setData] = useState([]);
    const [openDataList, setOpenDataList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [showCategory, setShowCategory] = useState({});
    const [showCheckList, setShowCheckList] = useState({});
    const [selectedCategory, setSelectCategory] = useState({});

    const categoryList = ['유산소', '근력', '생활운동'];

    // 렌더링과 동시에 가져 올 데이터 샘플
    useEffect(() => {
        const mockData = getMockData();
        const mockOpenData = getMockOpenData();

        // 초기에 체크 상태일 데이터 리스트
        const initialCheckedData = mockData.reduce(
            (accumulator, oneDayData) => {
                accumulator[oneDayData.dayNo] = oneDayData.exerciseList.map(
                    (exercise) => exercise.id,
                );
                return accumulator;
            },
            {},
        );

        setData(mockData);
        setOpenDataList(mockOpenData);
        setCheckedItems(initialCheckedData);
    }, []);

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
        return category
            ? openDataList.filter((list) => list.category === category)
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
        setData,
    ) => {
        let items = checkedItems[dayNo] || [];

        let updateCheckedItems;
        let updateExerciseList;

        // 이미 리스트에 있으면 제거
        if (items.includes(exerciseId)) {
            updateCheckedItems = items.filter((id) => id !== exerciseId);
            updateExerciseList = oneDayData.exerciseList.filter(
                (exercise) => exercise.id !== exerciseId,
            );
        } else {
            // 리스트에 없으면 추가
            const addExercise = openDataList.find((ex) => ex.id === exerciseId);

            updateCheckedItems = [...items, exerciseId];
            updateExerciseList = [...oneDayData.exerciseList, addExercise];
        }

        setCheckedItems((prev) => ({ ...prev, [dayNo]: updateCheckedItems }));

        setData((prev) =>
            prev.map((dayData) =>
                dayData.dayNo === dayNo
                    ? {
                          ...dayData,
                          exerciseList: updateExerciseList,
                          kcal: handleCalculateCarolie(
                              updateExerciseList,
                              dayData.weight,
                          ),
                      }
                    : dayData,
            ),
        );
    };

    const handleSubmit = () => {
        for (const day of data) {
            const dayNo = day.dayNo;
            if (!checkedItems[dayNo] || checkedItems[dayNo].length === 0) {
                alert(`${dayNo}일차에 선택된 운동이 존재하지 않습니다.`);
                return;
            }
        }
        alert('폼 제출 완료');
        console.log('제출 데이터 ::: ', data);
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>FIT-ROUTINE</p>

            {data.map((oneDayData, index) => {
                const dayNo = oneDayData.dayNo;

                return (
                    <div key={`${dayNo}_${index}`}>
                        <DayRoutine
                            data={oneDayData}
                            onClick={() => handleShowCategory(dayNo)}
                            checkedItems={checkedItems[dayNo]}
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
                        {oneDayData.kcal < DAILY_BURN_KCAL && (
                            <div className={styles.message}>
                                <p>
                                    선택하신 운동의 총 소모 칼로리는
                                    <span
                                        className={` ${styles.kcal}`}>
                                        {oneDayData.kcal}kcal
                                    </span>
                                    입니다.
                                    <p className={styles.burnKcal}>
                                        {oneDayData.kcal}/{DAILY_BURN_KCAL}
                                    </p>
                                </p>
                            </div>
                        )}

                        {showCategory[dayNo] && (
                            <div className={styles.category}>
                                {categoryList.map((category, index) => (
                                    <Category
                                        key={`${category}_${index}`}
                                        text={category}
                                        onClick={() =>
                                            handleShowCheckList(dayNo, category)
                                        }
                                        isSelected={
                                            selectedCategory[dayNo] === category
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
        </div>
    );
}

export default RecommendExercise;
