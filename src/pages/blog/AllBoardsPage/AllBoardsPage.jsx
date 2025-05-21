import Button from 'components/common/Button/Button';
import styles from './AllBoardsPage.module.css';
import BoardsPaging from 'components/blog/BoardsPaging/BoardsPaging';

export default function AllBoardsPage() {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.buttonContainer}>
                <span className={`${styles.likeBtn}`}><Button text={'좋아요순'} size='small'/></span>
                <span className={`${styles.latestBtn}`}><Button text={'최신순'} size='small'/></span>
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