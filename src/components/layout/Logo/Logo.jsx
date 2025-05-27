import styles from 'components/layout/Logo/Logo.module.css';
import { FaRunning } from 'react-icons/fa';

import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <div className={styles.logo}>
            <Link to="/">
                <FaRunning />
                <span>FIT-ROUTINE</span>
            </Link>
        </div>
    );
}
