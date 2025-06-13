import RoutineInfoForm from 'components/recommend/RoutineInfoForm/RoutineInfoForm';
import styles from './ExerciseInputInfo.module.css';

function ExerciseInputInfo({ goToNext, formData, setFormData, weight }) {
    return (
        <div className={styles.container}>
            <RoutineInfoForm
                title="운동 추천"
                goToNext={goToNext}
                formData={formData}
                setFormData={setFormData}
                weight={weight}
            />
        </div>
    );
}

export default ExerciseInputInfo;
