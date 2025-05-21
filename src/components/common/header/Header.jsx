import styles from 'components/common/header/Header.module.css';

import Login from 'components/common/header/LoginForm';
import Logout from 'components/common/header/LogoutForm';

import { Link } from 'react-router-dom';
import Logo from 'components/common/logo/Logo';

export default function Header() {

    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.headerLeft}>
                    <Logo />
                </div>
                <nav className={styles.navigation}>
                    <ul>
                        <li className={styles.menuItem}> <Link to="/">HOME</Link> </li>
                        <li className={styles.menuItem}> <Link to="#">식단 추천</Link> </li>
                        <li className={styles.menuItem}> <Link to="#">운동 추천</Link> </li>
                        <li className={styles.menuItem}> <Link to="#">Blog</Link>
                            <ul className={styles.subMenu}>
                                <li> <Link to="#">내 블로그</Link> </li>
                                <li> <Link to="#">내 TodoList</Link> </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                <Login />
                {/* <Logout /> */}
            </div>
        </>

    );
};