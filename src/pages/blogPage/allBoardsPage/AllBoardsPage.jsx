import BoardPreview from 'components/blogPage/boardPreview/BoardPreview';
import styles from './AllBoardsPage.module.css';

export default function AllBoardsPage() {
    return (
        <table>
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
    )
}