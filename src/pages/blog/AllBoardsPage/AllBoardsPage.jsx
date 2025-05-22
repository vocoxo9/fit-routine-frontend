import Button from 'components/common/Button/Button';
import styles from './AllBoardsPage.module.css';
import BoardsPaging from 'components/blog/BoardsPaging/BoardsPaging';
import CategorySelect from 'components/blog/CategorySelect/CategorySelect';
import { useState } from 'react';

export default function AllBoardsPage() {

    const [category, setCategory] = useState('자유');
    const categoryOptions = [
        { value: 'free', label: '자유' },
        { value: 'muscle', label: '근육 증진' },
        { value: 'diet', label: '체중 감량' },
        { value: 'stamina', label: '체력 증진' },
    ];

    // api요청으로 게시물 변경
    const changeBoardsByCategory = (e) => {
        const selected = e.target.value;
        setCategory(selected);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.buttonContainer}>
                <span className={`${styles.likeBtn}`}><Button text={'좋아요순'} size='small'/></span>
                <span className={`${styles.latestBtn}`}><Button text={'최신순'} size='small'/></span>
                <CategorySelect options={categoryOptions} value={category} onChange={changeBoardsByCategory}/>
            </div>
            <BoardsPaging/>
        </div>
    )
}