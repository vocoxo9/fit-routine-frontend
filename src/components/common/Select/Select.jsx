import styles from './Select.module.css';

/**
 * 선택 컴포넌트.
 *
 * @param id select 및 label을 위한 id 값
 * @param name select의 name 값
 * @param label label 텍스트
 * @param value select의 value 값
 * @param onChange 값이 변경될 때 호출되는 함수
 * @param options select 하위 옵션 목록
 * @param error - 에러 메시지 (선택)
 */
const Select = (
    {
        id,
        name,
        label,
        value,
        onChange,
        options,
        error,
    },
) => <div className={styles.container}>
    <label
        className={styles.label}
        htmlFor={id}
    >
        {label}
    </label>
    <select
        className={styles.select}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
    >
        {options.map((option, index) => (
            <option
                key={`${option.value}_${index}`}
                value={option.value}
            >
                {option.label}
            </option>
        ))}
    </select>
    {error && (
        <p className={styles.error}>
            {error}
        </p>
    )}
</div>;

export default Select;