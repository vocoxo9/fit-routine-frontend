import styles from './OnesBlogPage.module.css';
import {VscAccount, VscEdit} from "react-icons/vsc";
import BoardsPaging from 'components/blog/BoardsPaging/BoardsPaging';
import Likes from 'components/common/Likes/Likes';
import BlogGrade from 'components/common/BlogGrade/BlogGrade';
import GenderImage from 'components/common/genderImage/GenderImage';

export default function OnesBlogPage() {

    return (
        <div className={styles.blogContainer}>
            <div className={styles.blogHeader}>
                <div className={styles.ownerCard}>
                    <div className={styles.cardHeader}>
                        <GenderImage gender='female'/>
                        <div className={styles.ownerName}>
                            일김현's Blog
                        </div>
                        <div className={styles.follow}>
                            <Likes count={46437} isBig={true}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={styles.introduceContainer}>
                        <div className={styles.introduceHeader}>
                            <button className={styles.editBtn}><VscEdit /></button>
                        </div>
                        <div className={styles.introduceText}>
                        {
                        ("안녕하세요.\n\n제 이름은 김일현입니다.\n잘 부탁드립니다.")
                            .split('\n')
                            .map((line, idx) => (
                            <span key={idx}>
                                {line}
                                <br />
                            </span>
                            ))}
                        </div>
                    </div>

                </div>
                <div className={styles.gradeContainer}>
                    <BlogGrade grade={359}/>
                </div>
            </div>
            
            <div className={styles.boardsContainer}>
                <BoardsPaging/>
            </div>
        </div>
    )
}