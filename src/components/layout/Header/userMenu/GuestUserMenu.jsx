import styles from 'components/layout/Header/Header.module.css';

import { Link } from 'react-router-dom';

function GuestUserMenu() {
    return (
        <div className={styles.headerRight}>
            <button className={styles.button} >로그인</button>
            <Link to="#">
                <p>회원가입</p>
            </Link>
        </div>
    );
}

export default GuestUserMenu;
