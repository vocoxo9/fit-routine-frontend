import styles from './OnesBlogPage.module.css';
import BoardsPaging from 'components/blog/BoardsPaging/BoardsPaging';
import Likes from 'components/common/Likes/Likes';
import BlogGrade from 'components/common/BlogGrade/BlogGrade';
import GenderImage from 'components/common/GenderImage/GenderImage';
import { useEffect, useState } from 'react';
import Introduce from 'components/blog/Introduce/Introduce';
import { checkBlogOwner, getBlogDetailByBlogId, getBlogDetailByToken, getIsLikedByBlogId, getLikeCountByBlogId, likeOrUnlikeBlogAPI } from 'utils/api/blogApi';
import { useParams } from 'react-router-dom';

function OnesBlogPage() {
    const { blogIds } = useParams(); // URL의 :blogIds
    const [blogId, setBlogId] = useState(null);
    const [blog, setBlog] = useState(null);
    const [blogLike, setBlogLike] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
    const fetchBlogData = async () => {
            let data;
            let currentBlogId;

            if (blogIds) {
                // 다른 사람 블로그
                currentBlogId = blogIds;
                data = await getBlogDetailByBlogId(currentBlogId);
            } else {
                // 내 블로그
                const myBlog = await getBlogDetailByToken();
                currentBlogId = myBlog.blogId;
                data = myBlog;
                setIsOwner(true); 
            }

            setBlogId(currentBlogId);

            setBlog({
                nickname: data.nickname,
                gender: data.gender === 'M' ? 'male' : 'female',
                introduce: data.introduce,
                blogGrade: data.grade,
            });

            const likeCount = await getLikeCountByBlogId(currentBlogId);
            const isLiked = await getIsLikedByBlogId(currentBlogId);

            setBlogLike({
                likeCount: likeCount.count,
                isLiked: isLiked.followed,
            });

            // 남의 블로그일 경우에만 소유자 여부 확인
            if (blogIds) {
                const owner = await checkBlogOwner(currentBlogId);
                setIsOwner(owner);
            }
        };

        fetchBlogData();
    }, [blogIds]);

    const handleLikeClick = async () => {
        const prev = blogLike;

        setBlogLike({
            likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
            isLiked: !prev.isLiked,
        });

        try {
            await likeOrUnlikeBlogAPI(blogLike.isLiked, blogId);
        } catch (error) {
            alert('자신의 블로그는 팔로우 할 수 없습니다.');
            setBlogLike(prev);
        }
    };


    return (
        <div className={styles.blogContainer}>
            {blog ?
                <>
                    <div className={styles.blogHeader}>
                        <div className={styles.ownerCard}>
                            <div className={styles.cardHeader}>
                                <GenderImage gender={blog.gender} />
                                <div className={styles.ownerName}>
                                    {blog.nickname}'s Blog
                                </div>
                                <div className={styles.follow}>
                                    {blogLike &&
                                        <Likes
                                            count={blogLike.likeCount}
                                            isBig={true}
                                            isLiked={blogLike.isLiked}
                                            onClick={handleLikeClick}
                                        />
                                    }
                                </div>
                            </div>
                            <hr />
                            <Introduce isOwner={isOwner} intro={blog.introduce} blogId={blogId}/>
                        </div>
                        <div className={styles.gradeContainer}>
                            <BlogGrade grade={blog.blogGrade} />
                        </div>
                    </div>
                    <div className={styles.boardsContainer}>
                        <BoardsPaging nickname={blog.nickname} />
                    </div>
                </> :
                <>
                    <p className={styles.loadingMsg}>
                        불러오는 중...
                    </p>
                </>
            }
        </div>
    );
}

export default OnesBlogPage;
