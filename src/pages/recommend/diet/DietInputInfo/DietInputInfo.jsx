import RoutineInfoForm from 'components/recommend/RoutineInfoForm/RoutineInfoForm';
import styles from './DietInputInfo.module.css';

function DietInputInfo({ goToNext, formData, setFormData, weight }) {
    return (
        <div className={styles.container}>
            <RoutineInfoForm
                title="식단 추천"
                goToNext={goToNext}
                formData={formData}
                setFormData={setFormData}
                weight={weight}
            />
        </div>
    );
}

export default DietInputInfo;
