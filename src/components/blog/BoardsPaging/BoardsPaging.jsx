import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardPreview from '../BoardPreview/BoardPreview';
import styles from './BoardsPaging.module.css';
import axiosInstance from '../../../utils/api/axios';

/**
 * 게시물 페이징 컴포넌트 - 전체 게시판 페이지, 블로그 페이지 사용
 *
 * @param {number} blogId 블로그 아이디
 * @param {string} order 게시물 나열 순서 - like:좋아요순(기본값) / latest:최신순
 * @param {string} category 게시물 카테고리 - free:모두(기본값) / muscle:근육증진 / diet:체중감량 / stamina:체력증진
 */
function BoardsPaging(
    {
        blogId,
        order = 'like',
        category = 'ALL',
    },
) {
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const params = {
            page: page,
            size: 6,
        };

        axiosInstance
            .get(
                blogId ? `/blogs/${blogId}/posts` : '/posts',
                { params },
            )
            .then(response => {
                setPosts(response.data);
            })
            .catch(() => {
                window.location.href = '/';
            });
    }, [page, blogId, order, category]);

    const chunked = [];
    for (let i = 0; i < posts.length; i += 3) {
        chunked.push(
            posts.slice(i, i + 3),
        );
    }

    return (
        <>
            <table className={styles.table}>
                <tbody>
                {chunked.map((posts, outerIndex) =>
                    <tr
                        key={`outer_${outerIndex}`}
                    >
                        {posts.map((post, innerIndex) => (
                            <td
                                key={`inner_${innerIndex}`}
                                className={styles.td}
                            >
                                <BoardPreview
                                    boardWriter={post.nickname}
                                    boardTitle={post.title}
                                    boardId={post.postId}
                                />
                            </td>
                        ))}
                    </tr>
                )}
                </tbody>
            </table>

            <nav className={styles.nav}>
                <ul className={styles.ul} id="pagination-area">
                    <li>
                        <a
                            href="#"
                            onClick={() => setPage(Math.max(page - 1, 0))}
                        >
                            이전
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={() => setPage(Math.min(page + 1, 9))}
                        >
                            다음
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default BoardsPaging;
