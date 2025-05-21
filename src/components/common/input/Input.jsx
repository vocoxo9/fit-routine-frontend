import styles from './Input.module.css';

/**
 * 사용자 입력을 받는 Input 컴포넌트입니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.size - input 크기
 * @param {string} props.type - input 타입
 * @param {string} props.id - input 요소의 id
 * @param {string} props.name - input 요소의 name
 * @param {string} props.value - input 요소의 value
 * @param {string} [props.label] - 라벨 텍스트 (선택)
 * @param {function} [props.onChange] - 값이 변경될 때 호출되는 함수 (선택)
 * @param {function} [props.onBlur] - 포커스를 잃었을 때 호출되는 함수 (선택)
 * @param {string} [props.error] - 에러 메시지 (선택)
 * @param {boolean} [props.readOnly] - 읽기 전용 여부 (선택)
 * @param {String} [props.placeHolder] - 입력 전 텍스트 (선택)
 * @param {String} [props.maxLength] - 입력 전 텍스트 (선택)
 */
function Input(
    {
        size,
        type,
        id,
        name,
        value,
        label,
        onChange,
        onBlur,
        error,
        readOnly,
        placeHolder,
        maxLength
    }
) {
    return (
        <div className='inputArea'>
            {label && (
                <label htmlFor={id}>
                    {label}
                </label>
            )}
            <div>
                <input
                    className={styles[size]}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    readOnly={readOnly}
                    placeholder={placeHolder}
                    onChange={onChange}
                    onBlur={onBlur}
                    maxLength={maxLength}
                />
                {error && (
                    <p className={styles.error}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Input;