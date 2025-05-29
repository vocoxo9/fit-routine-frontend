import styles from './DayRoutine.module.css';

/**
 * @data 사용자에게 제공할 추천 리스트 [dayNo, kcal, name(메뉴|운동명), id(메뉴|운동ID)]
 * @onClick onClick 이벤트
 * @onChange onChange 이벤트
 * @returns {JSX.Element} n일차 루틴 추천 컴포넌트
 */
const DayRoutine = ({ data, checkedItems, onClick, handleCheckBoxClick }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span className={styles.dayNo}>{data.dayNo}일차</span>
                <span className={styles.kcal}>{data.kcal}kcal</span>
            </div>

            {/* 식단|운동 추천 리스트  */}
            <div className={styles.formLeft}>
                {data.exerciseList.map((exercise, index) => (
                    <input
                        type="checkbox"
                        key={`${exercise.id}_${index}`}
                        name={`${exercise.name}`}
                        value={exercise.id}
                        id={`${data.dayNo}_${exercise.id}`}
                        label={exercise.name}
                        checked={checkedItems.includes(exercise.id)}
                        onChange={() => handleCheckBoxClick(exercise.id)}
                    />
                ))}
            </div>

            <div className={styles.formRight}>
                <button className={styles.plusBtn} onClick={onClick}>
                    +
                </button>
            </div>
        </div>
    );
};

export default DayRoutine;
