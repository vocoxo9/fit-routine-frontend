
import styles from './AllBoardsPage.module.css';
import BoardsPaging from 'components/blogPage/boardsPaging/BoardsPaging';

export default function AllBoardsPage() {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.buttonContainer}>
                <button className={`${styles.likeBtn}`}>좋아요순</button>
                <button className={`${styles.latestBtn}`}>최신순</button>
                <select className={styles.select}>
                    <option>자유</option>
                    <option>근육 증진</option>
                    <option>체중 감량</option>
                    <option>체력 증진</option>
                </select>
            </div>
            <BoardsPaging/>
        </div>
    )
}