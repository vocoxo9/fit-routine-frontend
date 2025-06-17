import { VscWarning } from 'react-icons/vsc';
import styles from './ErrorPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
    const navigate = useNavigate();

    const moveMainPage = () => {
        navigate('/');
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.text}>잘못된 접근입니다.</div>
            <div className={styles.warningIcon}>
                <VscWarning />
            </div>
            <div>
                <button className={styles.homeBtn} onClick={moveMainPage}>
                    HOME
                </button>
            </div>
        </div>
    );
}
