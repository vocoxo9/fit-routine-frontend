import styles from 'components/layout/Header/Header.module.css';

import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';

function LoginForm() {
    return (
        <div className={styles.headerRight}>
            <Button size="logInOut" text="로그인" />
            <Link to="#">
                <p>회원가입</p>
            </Link>
            <Link to="#">
                <p>회원가입</p>
            </Link>
        </div>
    );
}

export default LoginForm;
