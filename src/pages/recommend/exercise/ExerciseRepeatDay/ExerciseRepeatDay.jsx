import RepeatDay from 'components/recommend/RepeatDay/RepeatDay';
import styles from './ExerciseRepeatDay.module.css';

function ExerciseRepeatDay({ goToNext, formData, setFormData }) {
    return (
        <div className={styles.container}>
            <RepeatDay
                goToNext={goToNext}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
}
export default ExerciseRepeatDay;
