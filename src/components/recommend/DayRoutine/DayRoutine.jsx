import CheckBox from 'components/common/CheckBox/CheckBox';
import styles from './DayRoutine.module.css';

/**
 * @data 사용자에게 제공할 추천 리스트 [dayNo, kcal, name(메뉴|운동명), id(메뉴|운동ID)]
 * @returns {JSX.Element} 반복일 폼 컴포넌트
 */
const DayRoutine = (
    {
        data,
        onClick,
        onChange,
        checked
    }
) => {

    return (
        <div className={styles.dayForm}>
            <div className={styles.dayTitle}>
                <span>{data.dayNo}일차</span>
                <span>{data.kcal}kcal</span>
            </div>

            {/* 식단|운동 추천 리스트  */}
            <div className={styles.formLeft}>
                {data.exerciseList.map((el, idx) => (
                    <CheckBox
                        key={`${el.id}_${idx}`}
                        name={`${el.id}`}
                        id={el.name}
                        label={el.name}
                        checked={checked}
                        onChange={onChange}
                    />
                ))}
            </div>

            <div className={styles.formRight}>
                <button
                    className={styles.plusBtn}
                    onClick={onClick} >
                    +
                </button>
            </div>
        </div>
    );
}

export default DayRoutine;