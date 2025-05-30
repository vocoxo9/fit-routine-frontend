import { useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import buttons from 'assets/styles/common/button.module.css';

/**
 * Blog의 Todo페이지에서 개인이 정한 식단 및 운동을 보여주는 컴포넌트
 *
 * @param todoList 개인이 설정한 TodoList
 */
function TodoList({ todoList }) {
    const [header, setHeader] = useState('');
    const [total, setTotal] = useState({
        calorie: 0,
        period: 0,
    });
    const startAt = todoList.startAt;
    const endAt = todoList.endAt;

    const changeHeader = (category) => {
        category === 'menu' ? setHeader('식단') : setHeader('운동');
    };

    const liContent = (item) => {
        return todoList.category === 'menu'
            ? ` ${item.name}`
            : `${item.name}(${item.met}kcal)`;
    };

    const calcTotalCalorie = (prop) => {
        let sum = 0;
        if (prop.category === 'menu') {
            prop.list.forEach((element) => {
                sum += element.calorie;
            });
        } else if (prop.category == 'exercise') {
            prop.list.forEach((element) => {
                sum += element.met;
            });
        }
        return sum;
    };

    const calcTotalPeriod = (startAt, endAt) => {
        const end = new Date(endAt);
        const start = new Date(startAt);
        const diff = end - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    const handleEditClick = (todoId) => {
        alert(todoId + '수정페이지 이동');
    };

    const handleDeleteClick = (todoId) => {
        // eslint-disable-next-line
        const answer = confirm(header + ' 리스트를 삭제하시겠습니까?');
        answer ? alert(todoId + '삭제') : alert('삭제 취소');
    };

    useEffect(() => {
        changeHeader(todoList.category);
        const totalObject = {
            calorie: calcTotalCalorie(todoList),
            period: calcTotalPeriod(startAt, endAt),
        };
        setTotal(totalObject);
    }, []);

    return (
        <div className={styles.listText}>
            <div className={styles.headerContainer}>
                <div className={styles.headerText}>TODO {header}</div>
                <div className={styles.periodText}>
                    *기간 : {startAt} ~ {endAt} (총{total.period}일)
                </div>
            </div>
            <div className={styles.todayList}>
                오늘의 {header} (총 {total.calorie}kcal)
                <ul className={styles.ul}>
                    {todoList.list.map((item, index) => {
                        return <li key={index}>{liContent(item)}</li>;
                    })}
                </ul>
            </div>
            <div className={styles.btnArea}>
                <button className={`${buttons.button} ${buttons.short}`}
                    onClick={(event) => handleEditClick(todoList.todoId)}
                >수정</button>
                <button className={`${buttons.button} ${buttons.short}`}
                    onClick={(event) => handleDeleteClick(todoList.todoId)}
                >삭제</button>
            </div>
        </div>
    );
}

export default TodoList;
