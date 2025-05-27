import styles from 'components/layout/Header/Header.module.css';
import { FaBell, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';

export default function Logout() {
    return (
        <div className={styles.headerRight}>
            <Button size="logInOut" text="로그아웃" />

            <div className={styles.icons}>
                <Link to="#">
                    <FaUser className={styles.icon} />
                </Link>
                <Link to="#">
                    <div>
                        <FaBell className={styles.icon} />
                        <span className={styles.notification}>33</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
