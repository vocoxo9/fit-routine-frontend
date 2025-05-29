import GenderImage from 'components/common/GenderImage/GenderImage';
import styles from './Like.module.css';
import button from 'assets/styles/common/button.module.css';
import BlogGrade from 'components/common/BlogGrade/BlogGrade';

function Like({ gender, nickName, grade }) {
    return (
        <div className={styles.likeContainer}>
            <div className={styles.iconArea}>
                <div className={styles.icon}>
                    <div className={styles.genderIcon}>
                        <GenderImage gender={gender} />
                    </div>
                    <div className={styles.grade}>
                        <BlogGrade grade={grade} />
                    </div>
                </div>
                <div className={styles.nickName}>{nickName}</div>
            </div>
            <div className={styles.cutBtn}>
                <button
                    className={`${button.button} ${styles.deleteBtn}`}>
                    관심 끊기
                </button>
            </div>
        </div>
    );
}

export default Like;
