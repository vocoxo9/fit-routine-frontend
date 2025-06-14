import React, { useEffect } from 'react';
import styles from './WelcomePage.module.css';
import formStyles from 'assets/styles/common/form.module.css';
import buttonStyles from 'assets/styles/common/button.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

function WelcomePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { nickname } = location.state || {};
    useEffect(() => {
        if (!nickname) {
            navigate('/error');
        }
    }, [nickname]);

    if (!nickname) {
        return null;
    }

    return (
        <div className={styles.outer}>
            <div className={`${styles.container} ${formStyles.form} ${formStyles.common}`}>
                <h1 className={styles.title}>
                    가입 완료
                </h1>
                <div>
                    <p className={styles.content}>
                        <strong className={styles.strong}>
                            {nickname}
                        </strong>
                        님의 가입을 환영합니다!
                    </p>
                    <button
                        className={`${styles.button} ${buttonStyles.button} ${buttonStyles.long}`}
                        onClick={() => navigate('/login')}
                    >
                        로그인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;