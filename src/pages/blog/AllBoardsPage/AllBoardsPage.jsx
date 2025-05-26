import Button from 'components/common/Button/Button';
import styles from './AllBoardsPage.module.css';
import BoardsPaging from 'components/blog/BoardsPaging/BoardsPaging';
import CategorySelect from 'components/blog/CategorySelect/CategorySelect';
import { useState } from 'react';

export default function AllBoardsPage() {

    const [category, setCategory] = useState('자유');

    // 임시데이터
    const boardList = [
        { src: 'jae3.jpg', boardWriter: '김일현', boardTitle: '사진1', boardId: 1 },
        { src: 'jae4.jpg', boardWriter: '유성재', boardTitle: '사진2', boardId: 2 },
        { src: 'jae5.jpg', boardWriter: '정혜영', boardTitle: '사진3', boardId: 3 },
        { src: 'jae3.jpg', boardWriter: '안민영', boardTitle: '사진4', boardId: 4 },
        { src: 'jae4.jpg', boardWriter: '임성준', boardTitle: '사진5', boardId: 5 },
        { src: 'jae5.jpg', boardWriter: '강사님', boardTitle: '사진6', boardId: 6 },
    ];

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
                <span className={`${styles.likeBtn}`}><Button text={'좋아요순'} size="small" /></span>
                <span className={`${styles.latestBtn}`}><Button text={'최신순'} size="small" /></span>
                <CategorySelect options={categoryOptions} value={category} onChange={changeBoardsByCategory} />
            </div>
            <BoardsPaging boardList={boardList} />
        </div>
    );
}