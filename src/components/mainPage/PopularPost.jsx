import styles from './PopularPosts.module.css';
import BoardPreview from 'components/blogPage/boardPreview/BoardPreview';

function PopulatorPost() {
    return (
        <>
            <div className={styles.title}>
                인기글 Top 3
            </div>
            <div className={styles.post}>
                <BoardPreview />
                <BoardPreview />
                <BoardPreview />
            </div>
        </>
    );
}

export default PopulatorPost;