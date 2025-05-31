import { useEffect, useState } from 'react';
import styles from './PopularPosts.module.css';
import BoardPreview from 'components/blog/BoardPreview/BoardPreview';

function PopularPost() {
    const [postData, setPostData] = useState([{}]);

    useEffect(() => {
        // const result = 인기글 3개불러오는 api함수
        // setPostData(result);
    }, []);

    return (
        <>
            <div className={styles.title}>인기글 Top 3</div>
            <div className={styles.post}>
                <BoardPreview />
                <BoardPreview />
                <BoardPreview />
            </div>
        </>
    );
}

export default PopularPost;
