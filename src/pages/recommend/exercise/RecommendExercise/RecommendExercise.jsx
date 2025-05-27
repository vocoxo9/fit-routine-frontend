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

    // 렌더링과 동시에 가져 올 데이터 샘플
    useEffect(() => {
        const mockData = [
            {
                todoNo: 1,
                repeatsDay: 3,
                templateNo: 1,
                dayNo: 1,
                kcal: 430,
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

        setData(mockData);
        setOpenDataList(mockOpenData);
        setCheckedItems(initialCheckedData);
    }, []);

    const categoryList = ['유산소', '근력', '생활운동'];

    const [showCategory, setShowCategory] = useState({});
    const [showCheckList, setShowCheckList] = useState({});
    const [selectCategory, setSelectCategory] = useState({});

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
            [dayNo]: !prev[dayNo],
        }));
    };

    // 카테고리에 따른 리스트 분류
    const filteredList = (dayNo) => {
        const category = selectCategory[dayNo];
        return category
            ? openDataList.filter((list) => list.category === category)
            : [];
    };

    // 체크박스 변경
    const handleCheckboxClick = (dayNo, exerciseId, isChecked) => {
        setCheckedItems((prev) => {
            const currentCheckedItems = prev[dayNo] || [];
            if (isChecked) {
                // 체크되면 추가 (중복 방지)
                return {
                    ...prev,
                    [dayNo]: [...new Set([...currentCheckedItems, exerciseId])],
                };
            } else {
                // 체크 해제되면 제거
                return {
                    ...prev,
                    [dayNo]: currentCheckedItems.filter(
                        (id) => id !== exerciseId,
                    ),
                };
            }
        });
    };

    return (
        <div className={styles.container}>
            <FormTitle text="FIT-ROUTINE" />

            {data.map((oneDayData, index) => {
                const dayNo = oneDayData.dayNo;
                const currentCheckedItems = checkedItems[dayNo] || [];

                return (
                    <div key={`${dayNo}_${index}`}>
                        <DayRoutine
                            data={oneDayData}
                            onClick={() => handleShowCategory(dayNo)}
                            onChange={(e) => setCheckedItems(checkedItems)}
                            checked={true}
                        />

                        {showCategory[dayNo] && (
                            <div className={styles.category}>
                                {categoryList.map((category, idx) => (
                                    <Category
                                        key={idx}
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
                                data={data}
                                openDataList={filteredList(dayNo)}
                            />
                        )}
                    </div>
                );
            })}

            <Button
                className={styles.registButton}
                size="bold"
                text="루틴 등록"
            />
        </div>
    );
}

export default RecommendExercise;
