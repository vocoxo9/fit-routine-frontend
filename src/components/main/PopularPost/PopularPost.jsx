import styles from './PopularPosts.module.css';
import BoardPreview from 'components/blog/BoardPreview/BoardPreview';

function PopularPost() {
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
