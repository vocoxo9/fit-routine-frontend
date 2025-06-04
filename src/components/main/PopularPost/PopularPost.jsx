import { useEffect, useState } from 'react';
import styles from './PopularPosts.module.css';
import BoardPreview from 'components/blog/BoardPreview/BoardPreview';
import { getPopularBoardtop3 } from 'utils/api/mainApi';

function PopularPost() {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const getboard = async () => {
            const result = await getPopularBoardtop3();
            setPostData(result);
            // alert("api 요청 후 결과 :: " + JSON.stringify(result));
        }
        getboard();
    }, []);

    return (
        <>
            <div className={styles.title}>인기글 Top 3</div>
            <div className={styles.post}>
                {postData &&
                    postData.map(post => {
                        return (
                            <BoardPreview
                            boardWriter={post.nickname}
                            boardTitle={post.title}
                            boardId={post.boardId} />
                        )
                    })
                }
            </div>
        </>
    );
}

export default PopularPost;
