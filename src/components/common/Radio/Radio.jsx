import styles from './Radio.module.css';

/**
 * 라디오 컴포넌트.
 *
 * @param id Radio 태그의 id
 * @param name Radio 태그의 name
 * @param value Radio 태그의 value
 * @param label Radio 태그에 대한 label 텍스트
 * @param [checked] Radio 태그의 checked (선택)
 * @param [onChange] Radio 태그의 onChange (선택)
 * @style Radio 태그의 CSS 스타일 ['common : 기본값', 'long']
 * @returns {JSX.Element} 라디오 컴포넌트
 */
const Radio = (
    {
        id,
        name,
        value,
        label,
        checked,
        onChange,
        style = 'common',
    },
) => {
    return (
        <label className={styles[`${style}Container`]}>
            <span className={styles[`${style}Label`]}>{label}</span>
            <input
                className={styles[`${style}Input`]}
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
        </label>
    );
};

export default Radio;