import RecommendForm from 'components/recommend/RecommendForm/RecommendForm';
import styles from './ExerciseInputInfo.module.css';

function ExerciseInputInfo() {
    return (
        <div className={styles.container}>
            <RecommendForm title='운동 추천' />
        </div>
    );
}

export default ExerciseInputInfo;
