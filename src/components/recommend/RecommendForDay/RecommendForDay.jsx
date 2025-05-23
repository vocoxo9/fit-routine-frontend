import CheckBox from 'components/common/CheckBox/CheckBox';
import styles from './RecommendForDay.module.css';

const RecommendForDay = ({
    template,
    selectedExercises,
    onChange,
    onClick
}) => {
    return (
        <div className={styles.recommendForm}>
            <div className={styles.repeatsDay}>
                <span>{template.dayNo}일차</span>
                <span>{template.kcal}kcal</span>
            </div>

            {/* 운동 리스트 */}
            <div className={styles.formLeft}>
                {selectedExercises.map((exercise) => (
                    <CheckBox
                        key={`form_${template.dayNo}_${exercise.id}`}
                        id={`${template.dayNo}_${exercise.id}`}
                        name={exercise.name}
                        label={exercise.label}
                        checked={true}
                        onChange={() => onChange(exercise)}
                    />
                ))}
            </div>

            {/* + 버튼 : 카테고리 */}
            <div className={styles.formRight}>
                <button className={styles.plusButton} onClick={onClick}>
                    +
                </button>
            </div>
        </div>
    );
};

export default RecommendForDay;