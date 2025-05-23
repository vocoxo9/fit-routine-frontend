import styles from "./SignUpPage.module.css";
import SignUpForm from "components/member/SignUpForm/SignUpForm";

const SignUpPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                가입 페이지
            </div>
            <div className={styles.content}>
                <SignUpForm/>
            </div>
        </div>
    )
}

export default SignUpPage