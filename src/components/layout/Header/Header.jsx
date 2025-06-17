import styles from 'components/layout/Header/Header.module.css';

import Login from 'components/layout/Header/userMenu/GuestUserMenu';

import { Link } from 'react-router-dom';
import Logo from 'components/layout/Logo/Logo';
import Logout from './userMenu/AuthUserMenu';
import GuestUserMenu from 'components/layout/Header/userMenu/GuestUserMenu';
import AuthUserMenu from './userMenu/AuthUserMenu';

export default function Header() {
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.headerLeft}>
                    <Logo />
                </div>
                <nav className={styles.navigation}>
                    <ul>
                        <li className={styles.menuItem}>
                            <Link to="/">HOME</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link to="/diet">식단 추천</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link to="/exercise">운동 추천</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link to="/board">Blog</Link>
                            <ul className={styles.subMenu}>
                                <li>
                                    <Link to="/blog">내 블로그</Link>
                                </li>
                                <li>
                                    <Link to="/todo">내 TodoList</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                {/* <GuestUserMenu /> */}
                <AuthUserMenu />
            </div>
        </>
    );
}
