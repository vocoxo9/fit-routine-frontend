import Button from 'components/common/Button/Button';
import Category from 'components/common/Category/Category';
import CheckBox from 'components/common/CheckBox/CheckBox';
import FormTitle from 'components/recommend/FormTitle/FormTitle';
import styles from 'pages/recommend/exercise/RecommendRoutine/RecommendRoutine.module.css';
import { useState } from 'react';

export default function SuggestRoutine() {

    // 샘플 데이터
    const exerciseList = [
        { name: 'exercise', id: '1', label: "크런치" },
        { name: 'exercise', id: '2', label: "런지" },
        { name: 'exercise', id: '3', label: "걷기" },
        { name: 'exercise', id: '4', label: "달리기" },
        { name: 'exercise', id: '5', label: "수영" },
        { name: 'exercise', id: '6', label: "줄넘기" },
        { name: 'exercise', id: '7', label: "등산" },
        { name: 'exercise', id: '8', label: "에어로빅" },
        { name: 'exercise', id: '9', label: "바벨 운동" },
        { name: 'exercise', id: '10', label: "계단 오르기" },
        { name: 'exercise', id: '11', label: "스쿼트" },
        { name: 'exercise', id: '12', label: "벤치프레스" },
        { name: 'exercise', id: '13', label: "플랭크" },
        { name: 'exercise', id: '14', label: "레그 프레스" },
        { name: 'exercise', id: '15', label: "필라테스" },
    ];

    const templates = [
        { dayNo: 1, kcal: 430, exerciseList: exerciseList },
        { dayNo: 2, kcal: 300, exerciseList: exerciseList },
        { dayNo: 3, kcal: 345, exerciseList: exerciseList },
        { dayNo: 4, kcal: 404, exerciseList: exerciseList }
    ];

    // 카테고리 상태 관리
    const [visibleCategory, setVisibleCategory] = useState({});
    const [showCategoryItems, setShowCategoryItems] = useState(false);

    // + 버튼 클릭 시 카테고리 보이게
    const visibleCategoryForDay = (dayNo) => {
        setVisibleCategory((prev) => ({
            ...prev,
            [dayNo]: !prev[dayNo],
        }));
    };

    // 상체 운동
    const upperBodyExercise = [
        { category: "상체", name: "푸시업" },
        { category: "상체", name: "벤치프레스" },
        { category: "상체", name: "체스트 프레스 머신" },
        { category: "상체", name: "프론트 레이즈" },
    ];

    // 카테고리 클릭 시 운동리스트 보이게
    const showCategoryAllItems = () => {
        setShowCategoryItems((prev) => !prev);
    }

    return (
        <div className={styles.container}>
            <FormTitle text="FIT-ROUTINE" />

            <div className={styles.formBox}>
                {templates.map((template) => (
                    <div key={`template_${template.dayNo}`}>
                        <div className={styles.suggestForm}>
                            <div className={styles.repeatsDay}>
                                <span>{template.dayNo}일차</span>
                                <span>{template.kcal}kcal</span>
                            </div>

                            <div className={styles.formLeft}>
                                {template.exerciseList.map((exercise) => (
                                    <CheckBox
                                        key={`template_${template.dayNo}_exercise${exercise.id}`}
                                        id={exercise.id}
                                        name={exercise.name}
                                        label={exercise.label}
                                    />
                                ))}
                            </div>

                            <div className={styles.formRight}>
                                <button className={styles.plusButton}
                                    onClick={() => visibleCategoryForDay(template.dayNo)}
                                > + </button>
                            </div>
                        </div>

                        {visibleCategory[template.dayNo] && (
                            <div className={styles.category}>
                                <Category text="상체" />
                                <Category text="하체" />
                                <Category text="전신" />
                                <Category text="생활운동" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Button className={styles.registButton} size="bold" text="루틴 등록" />
        </div>
    );

};