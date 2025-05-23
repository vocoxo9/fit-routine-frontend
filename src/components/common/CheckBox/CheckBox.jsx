import styles from './CheckBox.module.css'

/**
 * 체크박스 컴포넌트.
 *
 * @param id checkbox 태그의 id
 * @param name checkbox 태그의 name
 * @param value checkbox 태그의 value
 * @param label checkbox 태그에 대한 label 텍스트
 * @param [checked] checkbox 태그의 checked (선택)
 * @param [onChange] checkbox 태그의 onChange (선택)
 * @param [styleType] 스타일 타입 ('common', 'category')
 * @returns {JSX.Element} 체크박스 컴포넌트
 */
const CheckBox = ({
    id,
    name,
    value,
    label,
    checked,
    onChange,
    styleType = 'common'
}) => {
    
    const containerClass = styles[`${styleType}Container`];
    const inputClass = styles[`${styleType}Input`];
    const labelClass = styles[`${styleType}Label`];

    return (
        <div className={containerClass}>
            {styleType === 'category' ? (
                <>
                    <label className={labelClass} htmlFor={id}>
                        {label}
                    </label>
                    <input
                        className={inputClass}
                        type="checkbox"
                        id={id}
                        name={name}
                        value={value}
                        checked={checked}
                        onChange={onChange}
                    />
                </>
            ) : (
                <>
                    <input
                        className={inputClass}
                        type="checkbox"
                        id={id}
                        name={name}
                        value={value}
                        checked={checked}
                        onChange={onChange}
                    />
                    <label className={labelClass} htmlFor={id}>
                        {label}
                    </label>
                </>
            )}
        </div>
    );
};

export default CheckBox;
