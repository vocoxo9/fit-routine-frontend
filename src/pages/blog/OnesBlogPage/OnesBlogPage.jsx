import styles from './OnesBlogPage.module.css';
import BoardsPaging from 'components/blog/BoardsPaging/BoardsPaging';
import Likes from 'components/common/Likes/Likes';
import BlogGrade from 'components/common/BlogGrade/BlogGrade';
import GenderImage from 'components/common/GenderImage/GenderImage';
import { useEffect, useParams, useState } from 'react';
import Introduce from 'components/blog/Introduce/Introduce';

/**
 * 블로그 페이지
 */
function OnesBlogPage() {
    // const { nickname } = useParams('');    // <Route path="/blog/onesblog/:nickname" element={<OnesBlogPage />} />
    const [blog, setBlog] = useState({});
    const [blogLike, setBlogLike] = useState({});
    
    

    // nickname과 로그인유저의 토큰(좋아요 확인용)으로 blog정보 api요청
    const blogDetail = async () => {
        // axios.get('blog/onesblog?nickname='+nickname, {token});

        // 더미데이터
        const data = {
            nickname:'기밀현',
            gender:'male',
            introduce:'안녕하세요. 제 소개글을 봐주셔서 감사합니다.근데만약이렇게까지길어진다면어쩔건데\n저는 김일현이구요.\n너무 피곤하네요.\n\n\n어우우',
            like:{
                likeCount:16,
                isLiked:false,
            },
            blogGrade:87,
        }
        setBlog({
            nickname:data.nickname,
            gender:data.gender,
            introduce:data.introduce,
            blogGrade:data.blogGrade,
        })
        setBlogLike(data.like);
    };

    useEffect(() => {
        blogDetail();
    }, []);

    

    return (
        <div className={styles.blogContainer}>
            <div className={styles.blogHeader}>
                <div className={styles.ownerCard}>
                    <div className={styles.cardHeader}>
                        <GenderImage gender={blog.gender} />
                        <div className={styles.ownerName}>{blog.nickname}'s Blog</div>
                        <div className={styles.follow}>
                            <Likes count={blogLike.likeCount} isBig={true} isLiked={blogLike.isLiked} />
                        </div>
                    </div>
                    <hr></hr>
                    <Introduce intro={blog.introduce}/>
                </div>
                <div className={styles.gradeContainer}>
                    <BlogGrade grade={blog.blogGrade} />
                </div>
            </div>

            <div className={styles.boardsContainer}>
                <BoardsPaging nickname={blog.nickname}/>
            </div>
        </div>
    );
}

export default OnesBlogPage;