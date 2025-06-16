import RepeatDay from 'components/recommend/RepeatDay/RepeatDay';
import styles from './DietRepeatDay.module.css';

function DietRepeatDay({ goToNext, formData, setFormData }) {
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
export default DietRepeatDay;
