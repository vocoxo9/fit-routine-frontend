import { useEffect, useState } from 'react';
import BoardsPaging from 'components/blog/BoardsPaging/BoardsPaging';
import CategorySelect from 'components/blog/CategorySelect/CategorySelect';
import buttons from 'assets/styles/common/button.module.css';
import styles from './AllBoardsPage.module.css';

/**
 * 전체 게시판 페이지
 */
function AllBoardsPage() {
    const [category, setCategory] = useState('free');
    const [order, setOrder] = useState('like');


    const categoryOptions = [
        { value: 'free', label: '자유' },
        { value: 'muscle', label: '근육 증진' },
        { value: 'diet', label: '체중 감량' },
        { value: 'stamina', label: '체력 증진' },
    ];

    const changeBoardsByCategory = (e) => {
        const selected = e.target.value;
        setCategory(selected);
    };

    const changeOrder = (param) => {
        setOrder(param);
    };

    useEffect(() => {}, [category, order]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.buttonContainer}>
                <span
                    onClick={() => changeOrder('like')}
                    className={`${styles.likeBtn}`}>
                    <button className={`${buttons.button} ${buttons.short}`}>좋아요순</button>
                </span>
                <span
                    onClick={() => changeOrder('latest')}
                    className={`${styles.latestBtn}`}>
                    <button className={`${buttons.button} ${buttons.short}`}>최신순</button>
                </span>
                <CategorySelect
                    options={categoryOptions}
                    value={category}
                    onChange={(e) => changeBoardsByCategory(e)}
                />
            </div>
            <BoardsPaging
                order={order}
                category={category}
            />
        </div>
    );
}

export default AllBoardsPage;