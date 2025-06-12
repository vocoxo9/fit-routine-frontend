import styles from 'components/layout/Header/Header.module.css';

import { FaBell, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BellNotifications from '../Notification/BellNotifications';
import { useState } from 'react';

export default function AuthUserMenu() {
    const [exeRoutines, setExeRoutines] = useState(
        [
            // {category: '운동', content: '바벨로우'}, 
            // {category: '운동', content: '시티드로우'}, 
        ]
    );

    const [foodRoutines, setFoodRoutines] = useState(
        [
            // {category: '식단', content: '김치찌개'}, 
            // {category: '식단', content: '시금치'}, 
        ]
    );

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
            {(exeRoutines || foodRoutines) &&
                <div className={styles.track}>
                        <div className={styles.group}>
                            <div className={styles.category}>
                                {exeRoutines.map(exercise => {
                                    return(
                                        <div className={styles.card}>
                                            <span>{exercise.category} - {exercise.content}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.category}>
                                {foodRoutines.map(food => {
                                    return(
                                        <div className={styles.card}>
                                            <span>{food.category} - {food.content}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                </div>
            }
            {( (!exeRoutines || exeRoutines.length === 0 ) && (!foodRoutines || foodRoutines.length === 0) ) &&
                <div className={styles.routineError}>
                    등록된 루틴이 없습니다.
                </div>
            }
            </div>
        </div>
    );
}
