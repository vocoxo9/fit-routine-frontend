import GenderImage from 'components/common/genderImage/GenderImage';
import styles from './Like.module.css';
import BlogGrade from 'components/common/BlogGrade/BlogGrade';
import Button from 'components/common/Button/Button';

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
                <Button size="delete" text="관심 끊기" />
            </div>
        </div>
    );
}

export default Like;
