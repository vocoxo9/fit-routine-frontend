import BoardPreview from '../BoardPreview/BoardPreview';
import styles from './BoardsPaging.module.css';

/**
 * 게시물 페이징 컴포넌트 - 전체 게시판 페이지, 블로그 페이지 사용
 *
 * @param {Object} boardList 게시물 6개 정보 (사진주소, 작성자, 제목, 게시물번호)
 */
export default function BoardsPaging({ boardList }) {
    // 데이터를 가공한 후 하나하나 보내주는 함수

    return (
        <>
            <table className={styles.table}>
                <tr>
                    <td className={styles.td}>
                        <BoardPreview />
                    </td>
                    <td className={styles.td}>
                        <BoardPreview />
                    </td>
                    <td className={styles.td}>
                        <BoardPreview />
                    </td>
                </tr>
                <tr>
                    <td className={styles.td}>
                        <BoardPreview />
                    </td>
                    <td className={styles.td}>
                        <BoardPreview />
                    </td>
                    <td className={styles.td}>
                        <BoardPreview />
                    </td>
                </tr>
            </table>

            <nav className={styles.nav}>
                <ul className={styles.ul} id="pagination-area">
                    <li>
                        <a href="#">Prev</a>
                    </li>
                    <li>
                        <a href="#">1</a>
                    </li>
                    <li>
                        <a href="#">2</a>
                    </li>
                    <li>
                        <a href="#">3</a>
                    </li>
                    <li>
                        <a href="#">4</a>
                    </li>
                    <li>
                        <a href="#">5</a>
                    </li>
                    <li>
                        <a href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
