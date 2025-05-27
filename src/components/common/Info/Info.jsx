import styles from './Info.module.css';

function Info({ kind, text, children }) {
    return (
        <>
            <div className={styles[kind]}>
                <div className={`${styles.textBox} ${styles[kind]}`}>
                    <h4 className={`${styles.h4} ${styles[kind]}`}>{text}</h4>
                </div>
                <div className={`${styles.inputBox} ${styles[kind]}`}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default Info;
