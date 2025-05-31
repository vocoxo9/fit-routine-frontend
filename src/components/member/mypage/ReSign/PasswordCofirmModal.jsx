import styles from './PasswordConfirmModal.module.css';
import input from 'assets/styles/common/input.module.css';
import button from 'assets/styles/common/button.module.css';

function PasswordConfirmModal () {
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
                <input className={`${input.input} ${styles.long} ${styles.readonly}`} type="text" value='회원의 아이디' readOnly/>
                <input className={`${input.input} ${styles.long}`} type="password" />
                <button className={`${button.button} ${button.long}`}>확인</button>
            </form>
        </div>
    );
}

export default PasswordConfirmModal;