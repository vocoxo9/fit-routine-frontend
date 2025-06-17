import { useEffect, useState } from 'react';
import { calcTotalCalorie, calcTotalPeriod, formatDate } from 'utils/helpers/calculator';
import styles from './TodoList.module.css';
import buttons from 'assets/styles/common/button.module.css';
import { useNavigate } from 'react-router-dom';
import { deleteTodoByTodoId } from 'utils/api/blogApi';
import { successAlert } from 'utils/helpers/toastUtils';

/**
 * Blog의 Todo페이지에서 개인이 정한 식단 및 운동을 보여주는 컴포넌트
 *
 * @param todoList 개인이 설정한 TodoList
 */
function TodoList({ todoList, onDelete }) {
    const navigate = useNavigate();
    const [header, setHeader] = useState('');
    const [total, setTotal] = useState({
        calorie: 0,
        period: 0,
    });
    const { startedAt, endedAt } = todoList;

    const changeHeader = (category) => {
        category === 'MENU' ? setHeader('식단') : setHeader('운동');
    };

    const liContent = (item) => {
        return todoList.category === 'MENU'
            ? ` ${item.name} (${item.calorie}kcal)`
            : `${item.name}(${item.met}kcal)`;
    };

    const handleEditClick = (todoId) => {
        todoList.category === 'MENU' ? 
            navigate(`/menu/${todoId}`) :
            navigate(`/exercise/${todoId}`);
    };

    const handleDeleteClick = async (todoId) => {
        // eslint-disable-next-line
        if (confirm(header + ' 리스트를 삭제하시겠습니까?')) {
            await deleteTodoByTodoId(todoId);
            successAlert('삭제가 완료되었습니다.');
            onDelete(); 
        }
    };

    useEffect(() => {
        changeHeader(todoList.category);
        const totalObject = {
            calorie: calcTotalCalorie(todoList),
            period: calcTotalPeriod(startedAt, endedAt),
        };
        setTotal(totalObject);
    }, []);

    return (
        <div className={styles.listText}>
            <div className={styles.headerContainer}>
                <div className={styles.headerText}>TODO {header}</div>
                <div className={styles.periodText}>
                    *기간 : {formatDate(startedAt)} ~ {formatDate(endedAt)} (총{total.period}일)
                </div>
            </div>
            <div className={styles.todayList}>
                오늘의 {header} (총 {total.calorie}kcal)
                <ul className={styles.ul}>
                    {todoList.todos.map((item, index) => {
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
