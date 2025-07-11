import styles from './PasswordConfirmModal.module.css';
import input from 'assets/styles/common/input.module.css';
import button from 'assets/styles/common/button.module.css';
import errorStyles from 'assets/styles/common/error.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkCurrentPassword } from 'utils/api/profileApi.js'; 

function PasswordConfirmModal ({ email }) {
    const navigate = useNavigate();

    const [data, setData] = useState(
        {
            email: email || '',
            password: '',
        }
    );

    const [error, setError] = useState();

    const verifyPassword = async (password) => {
        const result = await checkCurrentPassword(password);
        return result;
    }

    const onChange = (event) => {
        setData(prev => ({
            ...prev,
            password: event.target.value
        }));
    };

    const handleConfirm = async () => {
        const isValid = await verifyPassword(data.password);
        (isValid) ? 
            navigate('/resign') : 
            setError('비밀번호가 일치하지 않습니다');
    };

    return (
        <div className={styles.modal}>
            <div className={styles.titleArea}>
                <div className={styles.title}>
                    비밀번호 확인
                </div>
                <div className={styles.subTitle}>
                    신중한 탈퇴를 위하여 비밀번호를 다시 한번 입력해주세요.
                </div>
            </div>
            <form className={styles.content}>
                <input 
                    className={`${input.input} ${styles.long} ${styles.readonly}`} 
                    type="text" 
                    value={email} 
                    readOnly
                />
                <input 
                    className={`${input.input} ${styles.long}`} 
                    type="password" 
                    value={data.password}
                    onChange={onChange}
                />
                {error &&
                    <p className={errorStyles.error}>{error}</p>
                }
                <button 
                    type="button"
                    className={`${button.button} ${button.long}`}
                    onClick={handleConfirm}
                    >
                    확인
                </button>
            </form>
        </div>
    );
}

export default PasswordConfirmModal;
