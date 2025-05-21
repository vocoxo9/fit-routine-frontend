
import styles from './OnesBlogPage.module.css';
import { VscAccount } from "react-icons/vsc";
import BoardsPaging from 'components/blogPage/boardsPaging/BoardsPaging';

export default function OnesBlogPage() {


    return (
        <div className={styles.blogContainer}>
            <div className={styles.ownerCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.maleImage}>
                        <VscAccount />
                    </div>
                    <div className={styles.ownerName}>
                        일김현's Blog
                    </div>
                    <div className={styles.follow}>
                        하투
                    </div>
                </div>
                <hr></hr>
            </div>
            <div className={styles.gradeContainer}>

            </div>
            <div className={styles.boardsContainer}>
                <BoardsPaging/>
            </div>
        </div>
    )
}