import styles from './RadioGroup.module.css';

/**
 * 라디오 그룹 컴포넌트.
 *
 * @param children 자식 라디오 컴포넌트
 * @returns {JSX.Element} 라디오 그룹 컴포넌트
 */
const RadioGroup = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default RadioGroup;