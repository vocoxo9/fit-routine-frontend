import styles from './ReSignInfo.module.css';

function ReSignInfo({ text, info }) {
    return (
        <>
            <div className={styles.table}>
                <div className={styles.subTitle}>
                    <h4 className={styles.h4}>
                        {text}
                    </h4>
                </div>
                <div className={styles.info}>
                    <div className={styles.infoText}>
                        {info}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReSignInfo;