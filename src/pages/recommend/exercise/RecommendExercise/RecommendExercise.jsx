import { useEffect, useRef, useState } from 'react';

import Button from 'components/common/Button/Button';
import FormTitle from 'components/common/FormTitle/FormTitle';
import Category from 'components/common/Category/Category';
import DayRoutine from 'components/recommend/DayRoutine/DayRoutine';
import CategoryForm from 'components/recommend/CategoryForm/CategoryForm';

import styles from './RecommendExercise.module.css';

const RecommendExercise = () => {
<<<<<<< HEAD
    const categoryList = ['유산소', '근력', '생활운동'];

    // 샘플 데이터
    // 회원에게 필요한 n일차 루틴
    const data = {
        todoNo: 1,
        repeatsDay: 4,
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
=======

    const categoryList = ['유산소', '근력', '생활운동'];
    
    // 샘플 데이터
    // 회원에게 필요한 n일차 루틴
    const data = {
        todoNo: 1, repeatsDay: 4,
        templateNo: 1, dayNo: 1, kcal: 430,
        exerciseList: [
            { id: 1, name: "런지", met: 3, category: "근력" },
            { id: 2, name: "크런치", met: 4, category: "근력" },
            { id: 3, name: "걷기", met: 3, category: "생활운동" },
            { id: 4, name: "달리기", met: 3, category: "유산소" },
            { id: 5, name: "수영", met: 3.5, category: "유산소" },
            { id: 6, name: "줄넘기", met: 3, category: "유산소" },
            { id: 7, name: "등산", met: 3, category: "생활운동" }
        ]
>>>>>>> ce74b32d9913c8e276aa0df60ea26a33bdadef1b
    };

    // 운동 공공데이터 리스트
    const openDataList = [
<<<<<<< HEAD
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
=======
        { id: 1, name: "런지", met: 3, category: "근력" },
        { id: 2, name: "크런치", met: 4, category: "근력" },
        { id: 3, name: "걷기", met: 3, category: "생활운동" },
        { id: 4, name: "달리기", met: 3, category: "유산소" },
        { id: 5, name: "수영", met: 3.5, category: "유산소" },
        { id: 6, name: "줄넘기", met: 3, category: "유산소" },
        { id: 7, name: "등산", met: 3, category: "생활운동" },
        { id: 8, name: "바벨 운동", met: 3, category: "근력" },
        { id: 9, name: "에어로빅", met: 3, category: "유산소" },
        { id: 10, name: "스쿼트", met: 3, category: "근력" },
        { id: 11, name: "계단 오르기", met: 3, category: "생활운동" },
        { id: 12, name: "벤치프레스", met: 3, category: "근력" },
        { id: 13, name: "플랭크", met: 3, category: "근력" },
        { id: 14, name: "레그프레스", met: 3, category: "근력" },
        { id: 15, name: "필라테스", met: 3, category: "유산소" },
>>>>>>> ce74b32d9913c8e276aa0df60ea26a33bdadef1b
    ];

    const [category, setCategory] = useState(false);
    const [checkList, setCheckList] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);
    const [items, setItems] = useState(true);

    const showCategory = () => {
        setCategory(!category);
<<<<<<< HEAD
        if (checkList === true) setCheckList(!checkList);
=======
        if(checkList === true ) setCheckList(!checkList);
>>>>>>> ce74b32d9913c8e276aa0df60ea26a33bdadef1b
    };

    const showCheckList = (category) => {
        setSelectCategory(category);
        setCheckList(!checkList);
    };

    // 카테고리에 따른 리스트 분류
<<<<<<< HEAD
    const filteredList = selectCategory
        ? openDataList.filter((list) => list.category === selectCategory)
        : [];
=======
    const filteredList = selectCategory ?
        openDataList.filter(list => list.category === selectCategory) :
        [];


>>>>>>> ce74b32d9913c8e276aa0df60ea26a33bdadef1b

    return (
        <div className={styles.container}>
            <FormTitle text="FIT-ROUTINE" />
            <DayRoutine
                data={data}
                onClick={showCategory}
<<<<<<< HEAD
                onChange={(e) => setItems(items)}
                checked={true}
            />
=======
                onChange={e=>setItems(items)}
                checked={true}
                 />
>>>>>>> ce74b32d9913c8e276aa0df60ea26a33bdadef1b

            {category && (
                <div className={styles.category}>
                    {categoryList.map((text, index) => (
                        <Category
                            key={index}
                            text={text}
                            onClick={() => showCheckList(text)}
<<<<<<< HEAD
                            isSelected={selectCategory === text}
                        />
=======
                            isSelected={selectCategory === text} />
>>>>>>> ce74b32d9913c8e276aa0df60ea26a33bdadef1b
                    ))}
                </div>
            )}

            {checkList && (
                <CategoryForm
                    data={data}
                    // 식단|운동 공공데이터 리스트 전달
                    openDataList={filteredList}
                />
            )}

<<<<<<< HEAD
            <Button
                className={styles.registButton}
                size="bold"
                text="루틴 등록"
            />
        </div>
    );
};

export default RecommendExercise;
=======
            <Button className={styles.registButton} size="bold" text="루틴 등록" />
        </div>
    );

}

export default RecommendExercise;
>>>>>>> ce74b32d9913c8e276aa0df60ea26a33bdadef1b
