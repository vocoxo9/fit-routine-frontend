import styles from './CheckBox.module.css';

/**
 * 체크박스 컴포넌트.
 *
 * @param id checkbox 태그의 id
 * @param name checkbox 태그의 name
 * @param value checkbox 태그의 value
 * @param label checkbox 태그에 대한 label 텍스트
 * @param [checked] checkbox 태그의 checked (선택)
 * @param [onChange] checkbox 태그의 onChange (선택)
 * @style checkbox 태그의 CSS 스타일 ['common : 기본값', 'square']
 * @returns {JSX.Element} 체크박스 컴포넌트
 */
const CheckBox = ({
    id,
    name,
    value,
    label,
    checked,
    onChange,
    style = 'common',
}) => {
    return (
        <div className={styles[`${style}Container`]}>
            <input
                className={styles[`${style}Input`]}
                type="checkbox"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <label className={styles[`${style}Label`]} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default CheckBox;
