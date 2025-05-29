import styles from './SignUpPage.module.css'
import SignUpForm from 'components/member/SignUpForm/SignUpForm';

const SignUpPage = () => {
    return (
        <div className={styles.container}>
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;