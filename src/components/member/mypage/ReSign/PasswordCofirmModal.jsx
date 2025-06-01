import styles from './PasswordConfirmModal.module.css';
import input from 'assets/styles/common/input.module.css';
import button from 'assets/styles/common/button.module.css';
import error from 'assets/styles/common/error.module.css';
import { useState } from 'react';

function PasswordConfirmModal ({ email, password }) {
    const [data, setData] = useState('');

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
                    onChange={(event) => event.target.value}
                />
                <button 
                    type="button"
                    className={`${button.button} ${button.long}`}
                >
                    확인
                </button>
            </form>
        </div>
    );
}

export default PasswordConfirmModal;