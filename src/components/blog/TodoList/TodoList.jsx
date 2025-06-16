import { useEffect, useState } from 'react';
import { calcTotalCalorie, calcTotalPeriod } from 'utils/helpers/calculator';
import styles from './TodoList.module.css';
import buttons from 'assets/styles/common/button.module.css';
import { fetchDeleteTodo } from 'utils/api/exerciseApi';
import { Navigate, useNavigate } from 'react-router-dom';

/**
 * Blog의 Todo페이지에서 개인이 정한 식단 및 운동을 보여주는 컴포넌트
 *
 * @param todoList 개인이 설정한 TodoList
 */
function TodoList({ todoList, todoId }) {
    const navigate = useNavigate();
    const [header, setHeader] = useState('');
    const [total, setTotal] = useState({
        calorie: 0,
        period: 0,
    });
    const { startAt, endAt } = todoList;

    const changeHeader = (category) => {
        category === 'menu' ? setHeader('식단') : setHeader('운동');
    };

    const liContent = (item) => {
        return todoList.category === 'menu'
            ? ` ${item.name}`
            : `${item.name}(${item.met}kcal)`;
    };

    const handleEditClick = async (todoId) => {
        alert(todoId + '수정페이지 이동');
        navigate(`/exercise/${todoId}`);
    };

    const handleDeleteClick = async (todoId) => {
        // eslint-disable-next-line
        const answer = confirm(header + ' 리스트를 삭제하시겠습니까?');
        if (answer) {
            alert(todoId + '삭제');
            const result = await fetchDeleteTodo(todoId);
            console.log(result);
            alert(`todo${todoId}가 삭제되었습니다!`);
        } else {
            alert('삭제 취소');
        }
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
                <button
                    className={`${buttons.button} ${buttons.short}`}
                    onClick={(event) => handleEditClick(todoId)}>
                    수정
                </button>
                <button
                    className={`${buttons.button} ${buttons.short}`}
                    onClick={(event) => handleDeleteClick(todoId)}>
                    삭제
                </button>
            </div>
        </div>
    );
}

export default TodoList;
