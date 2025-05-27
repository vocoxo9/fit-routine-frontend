import styles from './Button.module.css';

/**
 * 공통 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.size - 버튼 사이즈 클래스 (예: small, medium, large)
 * @param {string} props.text - 버튼 내 글자 (예: 등록, 수정, 취소, 삭제)
 * @param {function} [props.onClick] - 클릭 이벤트 핸들러
 * @param {function} [props.onMouseEnter] - 마우스 오버 이벤트 핸들러
 * @param {function} [props.onMouseLeave] - 마우스 아웃 이벤트 핸들러
 * @param {boolean} [props.disabled] - 버튼 비활성화 여부
 * @param {string} [props.type] - 버튼 타입여부 (submit:기본값, button:form 제출하지 않는 버튼)
 */
function Button({
    size,
    text,
    onClick,
    onMouseEnter,
    onMouseLeave,
    disabled,
    type,
}) {
    return (
        <>
            <button
                className={styles[size]}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                disabled={disabled}
                type={type}>
                {text}
            </button>
        </>
    );
}

export default Button;
