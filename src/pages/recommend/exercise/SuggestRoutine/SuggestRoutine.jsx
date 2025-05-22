import Button from 'components/common/Button/Button';
import CheckBox from 'components/common/CheckBox/CheckBox';
import FormTitle from 'components/recommend/FormTitle/FormTitle';
import styles from 'pages/recommend/exercise/SuggestRoutine/SuggestRoutine.module.css';

export default function SuggestRoutine() {

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

    return (
        <div className={styles.container}>
            <FormTitle text="FIT-ROUTINE" />

            <div className={styles.suggestForm}>
                <div className={styles.repeatsDay}>
                    <span>1일차</span>
                    <span>435kcal</span>
                </div>

                <div className={styles.formLeft}>
                    {exerciseList.map((exercise) => (
                        <CheckBox
                            key={`${exercise}+_index`}
                            id={exercise.id}
                            name={exercise.name}
                            label={exercise.label}
                        />
                    ))}
                </div>
                <div className={styles.formRight}>
                    <button className={styles.plusButton}>+</button>
                </div>
            </div>

            <Button size="bold" text="루틴 등록" />
        </div>
    );

};