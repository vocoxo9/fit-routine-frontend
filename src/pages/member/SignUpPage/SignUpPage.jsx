import styles from './SignUpPage.module.css'
import SignUpForm from 'components/member/SignUpForm/SignUpForm';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from 'utils/helpers/token';

const SignUpPage = () => {
    if (isLoggedIn()) {
        return <Navigate to="/error" replace />;
    }

    return (
        <div className={styles.container}>
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;