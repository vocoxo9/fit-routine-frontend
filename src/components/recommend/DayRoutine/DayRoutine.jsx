import styles from './DayRoutine.module.css';
import input from 'assets/styles/common/input.module.css';
import button from 'assets/styles/common/button.module.css';
import label from 'assets/styles/common/label.module.css';

/**
 * @data {object} 현재 날짜의 루틴 정보
 * @checkedItems {Array} 현재 날짜에서 선택된 운동들의 배열
 * @onClick {function}
 * @handleCheckBoxClick {function} 체크박스 클릭 시 호출될 함수
 * @kcal {number} 현재 날짜에 계산된 총 칼로리 값
 * @returns {JSX.Element} n일차 루틴 추천 컴포넌트
 */
const DayRoutine = ({
    data,
    checkedItems,
    onClick,
    handleCheckBoxClick,
    kcal,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span className={styles.dayNo}>{data.dayRepeat}일차</span>
                <span className={styles.kcal}>{kcal}kcal</span>
            </div>

            <div className={styles.formLeft}>
                {data.exerciseList
                    .filter((exercise) =>
                        checkedItems.includes(exercise.exerciseId),
                    )
                    .map((exercise, index) => (
                        <div
                            key={`${data.dayRepeat}_${index}`}
                            className={styles.boxContainer}>
                            <input
                                className={`${input.input} ${styles.box}`}
                                type="checkbox"
                                name={exercise.name}
                                value={exercise.exerciseId}
                                id={`${data.dayRepeat}_${exercise.exerciseId}`}
                                checked={checkedItems.includes(
                                    exercise.exerciseId,
                                )}
                                onChange={() =>
                                    handleCheckBoxClick(exercise.exerciseId)
                                }
                            />
                            <label
                                className={`${label.label} ${styles.label}`}
                                htmlFor={`${data.dayRepeat}_${exercise.exerciseId}`}>
                                {exercise.name}
                            </label>
                        </div>
                    ))}
            </div>

            <div className={styles.formRight}>
                <button
                    type="button"
                    className={`${button.button} ${styles.plusBtn}`}
                    onClick={onClick}>
                    +
                </button>
            </div>
        </div>
    );
};

export default DayRoutine;
