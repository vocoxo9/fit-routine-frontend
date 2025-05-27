import { useEffect, useRef, useState } from 'react';

import Button from 'components/common/Button/Button';
import FormTitle from 'components/common/FormTitle/FormTitle';
import Category from 'components/common/Category/Category';
import DayRoutine from 'components/recommend/DayRoutine/DayRoutine';
import CategoryForm from 'components/recommend/CategoryForm/CategoryForm';

import styles from './RecommendExercise.module.css';

function RecommendExercise() {
    const [data, setData] = useState([]);
    const [openDataList, setOpenDataList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});

    const exerciseTime = 0.5; // 임의로 30분
    const handleKcalCalculate = (exerciseList, weight) => {
        return exerciseList.reduce((total, exercise) => {
            return total + exercise.met * weight * exerciseTime;
        }, 0);
    };

    const [showCategory, setShowCategory] = useState({});
    const [showCheckList, setShowCheckList] = useState({});
    const [selectCategory, setSelectCategory] = useState({});

    const categoryList = ['유산소', '근력', '생활운동'];

    // 렌더링과 동시에 가져 올 데이터 샘플
    useEffect(() => {
        const mockData = [
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

        const mockOpenData = [
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

        // 초기에 체크 상태일 데이터 리스트
        const initialCheckedData = {};
        mockData.forEach((oneDayData) => {
            initialCheckedData[oneDayData.dayNo] = oneDayData.exerciseList.map(
                (ex) => ex.id,
            );
        });

        console.log(initialCheckedData);

        setData(mockData);
        setOpenDataList(mockOpenData);
        setCheckedItems(initialCheckedData);
    }, []);

    // 카테고리 표시
    const handleShowCategory = (dayNo) => {
        setShowCategory((prev) => ({
            ...prev,
            [dayNo]: !prev[dayNo],
        }));

        setShowCheckList((prev) => ({
            ...prev,
            [dayNo]: false,
        }));
    };

    // 체크리스트 표시
    const handleShowCheckList = (dayNo, category) => {
        setSelectCategory((prev) => ({
            ...prev,
            [dayNo]: category,
        }));

        setShowCheckList((prev) => ({
            ...prev,
            [dayNo]: true,
        }));
    };

    // 카테고리에 따른 리스트 분류
    const filteredByCategory = (dayNo) => {
        const category = selectCategory[dayNo];
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

        if (items.includes(exerciseId)) {
            updateCheckedItems = items.filter((id) => id !== exerciseId);
            updateExerciseList = oneDayData.exerciseList.filter(
                (exercise) => exercise.id !== exerciseId,
            );
        } else {
            const addExercise = openDataList.find((ex) => ex.id === exerciseId);

            updateCheckedItems = [...items, exerciseId];
            updateExerciseList = [...oneDayData.exerciseList, addExercise];
        }

        setCheckedItems((prev) => ({
            ...prev,
            [dayNo]: updateCheckedItems,
        }));

        setData((prev) =>
            prev.map((dayData) =>
                dayData.dayNo === dayNo
                    ? {
                          ...dayData,
                          exerciseList: updateExerciseList,
                          kcal: handleKcalCalculate(
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
        console.log('저장 완료 ::: ', data);
    };

    return (
        <div className={styles.container}>
            <FormTitle text="FIT-ROUTINE" />

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
                                            selectCategory[dayNo] === category
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

            <Button
                className={styles.registButton}
                size="bold"
                text="루틴 등록"
                onClick={handleSubmit}
            />
        </div>
    );
}

export default RecommendExercise;
