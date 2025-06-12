import styles from './Category.module.css';
import button from 'assets/styles/common/button.module.css';
/**
 * 공통 카테고리 컴포넌트
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.text - 버튼 내 글자 (예: 상체, 하체, 생활운동, 밥, 반찬)
 */
function Category({ text, value, onClick }) {
    return (
        <button
            type='button'
            className={`${button.button} ${styles.button}`}
            onClick={onClick}
            value={value}>
            {text}
        </button>
    );
}

export default Category;
