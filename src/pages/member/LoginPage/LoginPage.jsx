import styles from './LoginPage.module.css'
import LoginForm from 'components/member/LoginForm/LoginForm';

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;