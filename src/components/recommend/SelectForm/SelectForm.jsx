import styles from './SelectForm.module.css';

/**
 * 추천 페이지 SelectForm 컴포넌트
 * 
 * @param {string} id - select와 label에 사용할 ID
 * @param {string} label - label에 들어갈 텍스트
 * @param {string} value - 현재 선택된 값
 * @param {function} onChange - 선택 시 실행할 함수
 * @param {Array} options - 옵션 배열 (value, label 객체 배열)
 */
export default function SelectForm({ id, label, value, onChange, options }) {

    return (
        <div className={styles.selectArea}>
            <label className={styles.label}
                htmlFor={id}>{label}
            </label>
            <select
                className={styles.select}
                id={id}
                value={value}
                onChange={onChange}
            >
                {options.map((opt, idx) => (
                    <option key={`${opt.value}_${idx}`} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );

};