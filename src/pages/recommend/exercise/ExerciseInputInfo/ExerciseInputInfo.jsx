import RecommendForm from 'components/recommend/RecommendForm/RecommendForm';
import styles from './ExerciseInputInfo.module.css';

function ExerciseInputInfo({ goToNext, formData, setFormData }) {
    return (
        <div className={styles.container}>
            <RecommendForm
                title="운동 추천"
                goToNext={goToNext}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
}

export default ExerciseInputInfo;
