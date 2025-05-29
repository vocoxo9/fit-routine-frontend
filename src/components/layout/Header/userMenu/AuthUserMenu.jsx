import styles from 'components/layout/Header/Header.module.css';
import { FaBell, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BellNotifications from '../Notification/BellNotifications';
import { useState } from 'react';

export default function AuthUserMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleNOtificationOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={styles.headerRight}>
            <button size="logInOut" text="로그아웃" />

            <div className={styles.icons}>
                <Link to="#">
                    <FaUser className={styles.icon} />
                </Link>
                <Link to="#">
                    <div>
                        <FaBell
                            className={styles.icon}
                            onClick={handleNOtificationOpen}
                        />
                        <span className={styles.notification}>33</span>
                        <div
                            className={`${styles.bellNotifications} ${isOpen ? '' : styles.hide}`}>
                            <BellNotifications />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
