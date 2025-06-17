import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardPreview from '../BoardPreview/BoardPreview';
import styles from './BoardsPaging.module.css';
import axiosInstance from '../../../utils/api/axios';
import { getPostImagesByPostId, getPostListByBlogId } from 'utils/api/blogApi';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    useEffect(() => {
    const fetchPostsWithImages = async () => {
            const params = { page, size: 6 };
            const postsData = await getPostListByBlogId(blogId, params);

            const postsWithImages = await Promise.all(
                postsData.map(async (post) => {
                    const imageRes = await getPostImagesByPostId(post.postId);
                    return {
                        ...post,
                        image: `${process.env.REACT_APP_IMAGE_BASE_URL}${imageRes[0]?.changeName}` || null,
                    };
                })
            );
            setPosts(postsWithImages);
        };
        fetchPostsWithImages();
    }, [page, blogId, order, category]);

    const chunked = [];
    if(Array.isArray(posts)){
        for (let i = 0; i < posts.length; i += 3) {
            chunked.push(
                posts.slice(i, i + 3),
            );
    }}

    const handlePostClick =(postId) => {
        navigate(`/board/detail/${postId}`);
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
                                onClick={()=>handlePostClick(post.postId)}
                            >
                                <BoardPreview
                                    imgSrc={post.image}
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
