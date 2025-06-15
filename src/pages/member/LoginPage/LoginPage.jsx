import styles from './LoginPage.module.css';
import LoginForm from 'components/member/LoginForm/LoginForm';
import { isLoggedIn } from '../../../utils/helpers/token';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    if (isLoggedIn()) {
        return <Navigate to="/error" replace />;
    }

    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;