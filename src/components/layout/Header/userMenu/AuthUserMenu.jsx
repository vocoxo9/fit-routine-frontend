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
            <div className={styles.icons}>
                <div className={styles.iconsArea}>
                    <Link to="mypage">
                        <FaUser className={styles.icon} />
                    </Link>
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
                </div>
                <button className={styles.button}>로그아웃</button>
            </div>
            <div className={styles.carousel}>
                <div className={styles.track}>
                    <div className={styles.group}>
                        <div className={styles.category}>
                            <div className={styles.card}>운동 - 바벨로우</div>
                            <div className={styles.card}>운동 - 시티드로우</div>
                        </div>
                        <div className={styles.category}>
                            <div className={styles.card}>식단 - 김치찌개</div>
                            <div className={styles.card}>식단 - 시금치</div>
                        </div>
                    </div>
                    {/* 위와 동일한 카드 목록 복제 */}
                    {/* <div className={styles.group}>
                        <div className={styles.category}>
                            <div className={styles.card}>운동 - 바벨로우</div>
                            <div className={styles.card}>운동 - 시티드로우</div>
                        </div>
                        <div className={styles.category}>
                            <div className={styles.card}>식단 - 김치찌개</div>
                            <div className={styles.card}>식단 - 시금치</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
