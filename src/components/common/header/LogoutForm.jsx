import styles from 'components/common/header/Header.module.css';
import { FaUser, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../button/Button';

export default function Logout() {

    return (
        <div className={styles.headerRight}>
            <button className={styles.button}>로그아웃</button> <br />
            
            <Link to="#"><FaUser className={styles.icon} /></Link>
            <Link to="#">
                <FaBell className={styles.icon} />
                <span className={styles.notification}>3</span>
            </Link>
        </div>
    );

};