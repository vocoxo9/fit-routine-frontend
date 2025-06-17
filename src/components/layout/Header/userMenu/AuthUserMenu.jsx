import styles from 'components/layout/Header/Header.module.css';

import { FaBell, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import BellNotifications from '../Notification/BellNotifications';
import { useEffect, useState } from 'react';
import { getExeRoutines, getFoodRoutines } from 'utils/api/headerApi.js';
import { logout } from 'utils/api/loginApi';
import { isLoggedIn } from 'utils/helpers/token';

export default function AuthUserMenu() {
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchRoutines = async () => {
            const exercise = await getExeRoutines();
            setExeRoutines(exercise);

            const food = await getFoodRoutines();
            setFoodRoutines(food);
        }
        fetchRoutines();
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const handleNOtificationOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <div className={styles.headerRight}>
            <div className={styles.icons}>
                {loggedIn ? (
                    <>
                        <div className={styles.iconsArea}>
                            <Link to="mypage">
                                <FaUser className={styles.icon} />
                            </Link>
                            <div>
                                <FaBell
                                    className={styles.icon}
                                    onClick={handleNOtificationOpen}
                                />
                                
                                <div
                                    className={`${styles.bellNotifications} ${isOpen ? '' : styles.hide}`}>
                                    <BellNotifications />
                                </div>
                            </div>
                        </div>
                        <button
                            className={styles.button}
                            onClick={handleLogout}
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className={styles.button}
                            onClick={handleLogin}
                        >
                            로그인
                        </button>
                        <button
                            className={styles.button}
                            onClick={handleSignUp}
                        >
                            가입
                        </button>
                    </>
                )}
            </div>
            <div className={styles.carousel}>
                {(exeRoutines || foodRoutines) &&
                    <div className={styles.track}>
                        <div className={styles.group}>
                            <div className={styles.category}>
                                {exeRoutines.map(exercise => {
                                    return (
                                        <div className={styles.card}>
                                            <span>{exercise.category} - {exercise.content}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.category}>
                                {foodRoutines.map(food => {
                                    return (
                                        <div className={styles.card}>
                                            <span>{food.category} - {food.content}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
                {((!exeRoutines || exeRoutines.length === 0) && (!foodRoutines || foodRoutines.length === 0)) &&
                    <div className={styles.routineError}>
                        등록된 루틴이 없습니다.
                    </div>
                }
            </div>
        </div>
    );
}
