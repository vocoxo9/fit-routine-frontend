import styles from './OnesBlogPage.module.css';
import BoardsPaging from 'components/blog/BoardsPaging/BoardsPaging';
import Likes from 'components/common/Likes/Likes';
import BlogGrade from 'components/common/BlogGrade/BlogGrade';
import GenderImage from 'components/common/GenderImage/GenderImage';
import { useEffect, useState } from 'react';
import Introduce from 'components/blog/Introduce/Introduce';
import { getBlogDetailByBlogId, getIsLikedByBlogId, getLikeCountByBlogId, likeOrUnlikeBlogAPI } from 'utils/api/blogApi';
import { useParams } from 'react-router-dom';

/**
 * 블로그 페이지
 */
function OnesBlogPage() {
    const { blogId } = useParams(); 
    const [blog, setBlog] = useState(null);
    const [blogLike, setBlogLike] = useState(null);

    // blogId과 로그인유저의 토큰(좋아요 확인용)으로 blog정보 api요청
    const blogDetail = async () => {
        const data = await getBlogDetailByBlogId(blogId);
        
        setBlog({
            nickname: data.nickname,
            gender: data.gender === 'M'? 'male':'female',
            introduce: data.introduce,
            blogGrade: data.grade,
        });

        const likeCount = await getLikeCountByBlogId(blogId);
        const isLiked = await getIsLikedByBlogId(blogId);
        
        setBlogLike({
            likeCount:likeCount.count,
            isLiked:isLiked.followed,
        });
    };

    useEffect(() => {
        blogDetail();
    }, [blogId]);

    const handleLikeClick = async () => {
        const prev = blogLike;
        
        setBlogLike({
            likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
            isLiked: !prev.isLiked,
        });

        await likeOrUnlikeBlogAPI(blogLike.isLiked, blogId);
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
                            <Introduce intro={blog.introduce} blogId={blogId}/>
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
