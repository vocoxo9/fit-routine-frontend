import { useEffect, useState } from 'react';

import Button from 'components/common/Button/Button';
import Category from 'components/common/Category/Category';
import CheckBox from 'components/common/CheckBox/CheckBox';
import FormTitle from 'components/recommend/FormTitle/FormTitle';
import styles from 'pages/recommend/exercise/RecommendRoutine/RecommendRoutine.module.css';

export default function RecommendRoutine() {
    
    // 샘플 데이터
    const exerciseList = [
        { name: 'exercise', id: '1', label: "크런치", category: '상체' },
        { name: 'exercise', id: '2', label: "런지", category: '상체' },
        { name: 'exercise', id: '3', label: "걷기", category: '상체' },
        { name: 'exercise', id: '4', label: "달리기", category: '상체' },
        { name: 'exercise', id: '5', label: "수영", category: '상체' },
        { name: 'exercise', id: '6', label: "줄넘기", category: '하체' },
        { name: 'exercise', id: '7', label: "등산", category: '하체' },
        { name: 'exercise', id: '8', label: "에어로빅", category: '하체' },
        { name: 'exercise', id: '9', label: "바벨 운동", category: '생활운동' },
        { name: 'exercise', id: '10', label: "계단 오르기", category: '전신' },
        { name: 'exercise', id: '11', label: "스쿼트", category: '전신' },
        { name: 'exercise', id: '12', label: "벤치프레스", category: '전신' },
        { name: 'exercise', id: '13', label: "플랭크", category: '전신' },
        { name: 'exercise', id: '14', label: "레그 프레스", category: '전신' },
        { name: 'exercise', id: '15', label: "필라테스", category: '생활운동' },
    ];
    
    const templates = [
        { dayNo: 1, kcal: 430, exerciseList: exerciseList },
        { dayNo: 2, kcal: 300, exerciseList: exerciseList },
        // { dayNo: 3, kcal: 345, exerciseList: exerciseList },
        // { dayNo: 4, kcal: 404, exerciseList: exerciseList },
        // { dayNo: 5, kcal: 404, exerciseList: exerciseList },
        // { dayNo: 6, kcal: 404, exerciseList: exerciseList },
        // { dayNo: 7, kcal: 404, exerciseList: exerciseList }
    ];

    // ------------------------------------------------------------

    // 불러온 데이터들 초기에 체크된 상태로 로드
    useEffect(() => {
        const initialSelected = {};
        templates.forEach((template) => {
            // 모든 운동을 초기값으로 선택된 상태로 설정
            initialSelected[template.dayNo] = [...template.exerciseList];
        });
        setSelectedExercisesByDay(initialSelected);
    }, []);


    // 카테고리 상태
    const [visibleCategory, setVisibleCategory] = useState({});
    // 일차별 + 버튼 클릭 시 카테고리 보이게
    const visibleCategoryForDay = (dayNo) => {
        setVisibleCategory((prev) => {
            const newVisible = !prev[dayNo];

            if (!newVisible) {
                setSelectedCategory((prevSelected) => ({
                    ...prevSelected,
                    [dayNo]: null
                }));
            }

            return {
                ...prev,
                [dayNo]: newVisible
            }
        })
    }

    // 카테고리별 운동리스트 상태
    const [selectedCategory, setSelectedCategory] = useState({});
    // 카테고리 클릭 시 운동리스트 보이게
    const listByCategory = (dayNo, category) => {
        const filtered = exerciseList.filter((exercise) => exercise.category === category);

        setSelectedCategory((prev) => {
            const currentList = prev[dayNo];

            // 다른 카테고리 선택하면 새로 보이게
            return { ...prev,
                [dayNo]: currentList && currentList.length > 0 ? null : filtered
            };
        });
    };

    // 체크박스 관리
    const [selectedExercisesByDay, setSelectedExercisesByDay] = useState({});
    // 체크박스 클릭 시 리스트에서 삭제/추가되게
    const handleExerciseToggle = (dayNo, exercise) => {
        setSelectedExercisesByDay((prev) => {
            const currentList = prev[dayNo] || [];
            const exists = currentList.some((e) => e.id === exercise.id);

            const updatedList = exists
                ? currentList.filter((e) => e.id !== exercise.id)
                : [...currentList, exercise];

            return {
                ...prev,
                [dayNo]: updatedList
            };
        });
    };

    return (
        <div className={styles.container}>
            <FormTitle text="FIT-ROUTINE" />
            <div className={styles.formBox}>
                {templates.map((template) => (
                    <div key={`template_${template.dayNo}`}>
                        {/* n일차 폼 */}
                        <div className={styles.recommendForm}>
                            <div className={styles.repeatsDay}>
                                <span>{template.dayNo}일차</span>
                                <span>{template.kcal}kcal</span>
                            </div>

                            {/* 운동 리스트 */}
                            <div className={styles.formLeft}>
                                {(selectedExercisesByDay[template.dayNo] || []).map((exercise) => (
                                    <CheckBox
                                        key={`form_${template.dayNo}_${exercise.id}`}
                                        id={`${template.dayNo}_${exercise.id}`}
                                        name={exercise.name}
                                        label={exercise.label}
                                        checked={true}
                                        onChange={() => handleExerciseToggle(template.dayNo, exercise)}
                                    />
                                ))}
                            </div>
                            
                            {/* + 버튼 : 카테고리 */}
                            <div className={styles.formRight}>
                                <button className={styles.plusButton}
                                    onClick={() => visibleCategoryForDay(template.dayNo)}
                                > + </button>
                            </div>
                        </div>

                        {/* 카테고리 표기 */}
                        {visibleCategory[template.dayNo] && (
                            <div className={styles.category}>
                                <Category text="상체" onClick={() => listByCategory(template.dayNo, '상체')} />
                                <Category text="하체" onClick={() => listByCategory(template.dayNo, '하체')} />
                                <Category text="전신" onClick={() => listByCategory(template.dayNo, '전신')} />
                                <Category text="생활운동" onClick={() => listByCategory(template.dayNo, '생활운동')} />

                            </div>
                        )}

                        {/* 카테고리별 운동 리스트 */}
                        {selectedCategory[template.dayNo] && (
                            <div className={styles.selectedByCategory}>
                                {selectedCategory[template.dayNo].map((exercise) => (
                                    <CheckBox
                                        key={`selected_${template.dayNo}_${exercise.id}`}
                                        id={`${template.dayNo}_${exercise.id}`}
                                        name={exercise.name}
                                        label={exercise.label}
                                        checked={
                                            (selectedExercisesByDay[template.dayNo] || []).some((e) => e.id === exercise.id)
                                        }
                                        onChange={() => handleExerciseToggle(template.dayNo, exercise)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* 소모 칼로리 미달 시 메시지 폼 */}
                {/* <div className={styles.message}>
                    <p>선택하신 운동의 총 소모 칼로리는 <span>210kcal</span> 입니다.</p>
                    <p>210 / 300 kcal</p>
                </div> */}
            </div>

            <Button className={styles.registButton} size="bold" text="루틴 등록" />
        </div>
    );

};