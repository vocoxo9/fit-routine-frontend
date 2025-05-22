import styles from './MyPage.module.css';

function MyPage({ children }) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                마이페이지
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

export default MyPage;