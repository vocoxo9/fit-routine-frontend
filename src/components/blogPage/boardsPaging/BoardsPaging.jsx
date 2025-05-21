import BoardPreview from "../boardPreview/BoardPreview";
import styles from './BoardsPaging.module.css';

export default function BoardsPaging() {
    return(
        <>
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
                    <li><a href='#'>Prev</a></li>
                    <li><a href='#'>1</a></li>
                    <li><a href='#'>2</a></li>
                    <li><a href='#'>3</a></li>
                    <li><a href='#'>4</a></li>
                    <li><a href='#'>5</a></li>
                    <li><a href='#'>Next</a></li>
                </ul>
            </nav>
        </>
    )
}