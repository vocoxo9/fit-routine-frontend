import styles from './TodoList.module.css';
/**
 * Blog의 Todo페이지에서 개인이 정한 식단 및 운동을 보여주는 컴포넌트
 * 
 * @param todoList 개인이 설정한 TodoList
 */
function TodoList (
    {
        todoList
    }
) {

    const UnpackTodoList = () => {

    }

    return(
        <div className={styles.listText}>
            <span className={styles.headerText}>TODO 운동</span>
            <span className={styles.periodText}>*기간 : 2023.01.01 ~ 2023.01.07 (7일)</span>
            <div className={styles.todayList}>오늘의 운동 (총 266kcal)
                <ul className={styles.ul}>
                    <li>스쿼트</li>
                    <li>벤치프레스</li>
                    <li>달리기</li>
                    <li>풀업</li>
                    <li>레그프레스</li>
                </ul>
            </div>
        </div>
    )
}

export default TodoList;