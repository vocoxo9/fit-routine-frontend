import CheckBox from 'components/common/CheckBox/CheckBox';
import styles from './OpenDataCheckList.module.css';

/**
 * @data 사용자에게 제공할 추천 리스트 [dayRepeat, kcal, name(메뉴|운동명), id(메뉴|운동ID)]
 * @openDataList 식단|운동 공공데이터 리스트
 * @returns {JSX.Element} 카테고리 + 체크리스트 컴포넌트
 */
function OpenDataCheckList({
    checkedItems,
    openDataList,
    dayRepeat,
    handleCheckBoxClick,
}) {
    return (
        <div className={styles.container}>
            {openDataList.map((list, index) => (
                <CheckBox
                    key={`${list.exerciseId}_${index}`}
                    name={`${list.name}`}
                    value={list.exerciseId}
                    id={`${dayRepeat}_template_${list.exerciseId}`}
                    checked={checkedItems.includes(list.exerciseId)}
                    onChange={() => handleCheckBoxClick(list.exerciseId)}
                    label={list.name}
                    style="square"
                />
            ))}
        </div>
    );
}

export default OpenDataCheckList;
