import styles from './Category.module.css';


/**
 * 공통 카테고리 컴포넌트
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.text - 버튼 내 글자 (예: 상체, 하체, 생활운동, 밥, 반찬)
 */
function Category(
    { 
        text,
        onClick,
        onMouseEnter,
        onMouseLeave,
        isSelected
    }
) {
    return (
        <>
            <div className={`${styles.text} ${isSelected ? styles.selected : ''}`} onClick={onClick} 
            onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                {text}
            </div>
        </>
    );
}

export default Category;