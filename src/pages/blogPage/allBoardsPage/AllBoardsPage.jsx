import BoardPreview from 'components/blogPage/boardPreview/BoardPreview';
import styles from './AllBoardsPage.module.css';

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
            <table className={styles.table}>
                <tr>
                    <td className={styles.td}>
                        <BoardPreview/>
                    </td>
                    <td className={styles.td}>
                        <BoardPreview/>
                    </td>
                    <td className={styles.td}>
                        <BoardPreview/>
                    </td>
                </tr>
                <tr>
                    <td className={styles.td}>
                        <BoardPreview/>
                    </td>
                    <td className={styles.td}>
                        <BoardPreview/>
                    </td>
                    <td className={styles.td}>
                        <BoardPreview/>
                    </td>
                </tr>
            </table>

        <nav className={styles.nav}>
            <ul className={styles.ul} id="pagination-area">
                <li>Prev</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>Next</li>
            </ul>
		</nav>
        </div>
    )
}