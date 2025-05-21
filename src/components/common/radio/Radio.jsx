import styles from './Radio.module.css'

/**
 * 라디오 컴포넌트.
 *
 * @param id radio 태그의 id
 * @param name radio 태그의 name
 * @param value radio 태그의 value
 * @param label radio 태그에 대한 label 텍스트
 * @param [checked] radio 태그의 checked (선택)
 * @param [onChange] radio 태그의 onChange (선택)
 * @returns {JSX.Element} 라디오 컴포넌트
 */
const Radio = (
    {
        id,
        name,
        value,
        label,
        checked,
        onChange
    }
) => {
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <input
                className={styles.input}
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
        </div>
    )
}

export default Radio