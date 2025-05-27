import CheckBox from 'components/common/CheckBox/CheckBox';
import styles from './CategoryForm.module.css';

/**
 * @data 사용자에게 제공할 추천 리스트 [dayNo, kcal, name(메뉴|운동명), id(메뉴|운동ID)]
 * @openDataList 식단|운동 공공데이터 리스트
 * @returns {JSX.Element} 카테고리 + 체크리스트 컴포넌트
 */
const CategoryForm = ({ data, openDataList }) => {
    return (
        <div className={styles.checkListForm}>
            {openDataList.map((list, idx) => (
                <CheckBox
                    key={`${list.id}_${idx}`}
                    name={`${list.id}`}
                    id={list.name}
                    label={list.name}
                    style="square"
                />
            ))}
        </div>
    );
};

export default CategoryForm;
