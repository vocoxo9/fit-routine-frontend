import { Link, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import { useEffect, useState } from 'react';
import BlogGrade from 'components/common/BlogGrade/BlogGrade';
import TodoList from 'components/blog/TodoList/TodoList';
import './FullCalendar.css';
import styles from './OnesTodoPage.module.css';
import buttons from 'assets/styles/common/button.module.css';
import { getBlogDetailByToken, getExerciseTodoByToken, getMenuTodoByToken, getPostsTitles } from 'utils/api/blogApi';

/**
 * TODO 페이지
 */
function OnesTodoPage() {
    const [dateData, setDateData] = useState({});
    const [data, setData] = useState({});

    const navigate = useNavigate();

    const getTodoList = async () => {
        const menuData = await getMenuTodoByToken();
        const exerciseData = await getExerciseTodoByToken();
        
        setData(prev => ({
            ...prev,
            menuTodoList: menuData,
            exerciseTodoList: exerciseData,
        }));
    };

    useEffect(() => {
        getBlogDetailByToken().then(data => {
            setData({
                nickname: data.nickname,
                grade: data.grade,
            })
        });
        getTodoList();
        getPostsTitles().then(data => {
            setDateData(data);
        });
    }, []);

    // 캘린더의 제목 클릭시 해당 게시글 상세 페이지로 이동
    const handleTitleClick = (postId) => {
        navigate(`/board/detail/${postId}`);
    };

    // 달력에 표시할 제목이 너무 길면 ...으로 축약
    const overTitle = (title) => {
        if (title.length > 11) {
            return title.slice(0, 10) + '...';
        }
        return title;
    };

    // 게시물이 3개까지 꽉 찼다면 + 버튼 비활성화
    const isOverBoard = (data) => {
        if (data.length >= 3) {
            return true;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.nameGrade}>
                <span className={styles.name}>
                    {data.nickname}
                    <span className={styles.TODOText}>TODO</span>
                </span>
                <span className={styles.grade}>
                    <BlogGrade grade={data.grade} />
                </span>
            </div>

            <div className={styles.calendarContainer}>
                <div className={styles.fullCalendar}>
                    <FullCalendar
                        key={JSON.stringify(dateData)} // 상태 변경 시 리렌더 유도하는 속성. 외부에서 컴포넌트 사용할때 key예약어로 값을 지정하면 값에 변경이 있을때마다 리렌더를 시킨다.
                        plugins={[dayGridPlugin, interactionPlugin]} // dayGridPlugin : 한 달 달력 보기, interactionPlugin : 클릭, 선택 등 사용자 상호작용 활성화
                        initialView="dayGridMonth" // initialView : 처음 렌더링으로 어떤 뷰가 보일것인가?, dayGridMonth : 한 달 단위로 날짜를 그리드 형태로 보기
                        locale={koLocale} // 한국어 설정
                        dayCellContent={(arg) => {
                            // 각 날짜에 보여줄 것을 정의
                            const date = new Date(arg.date);
                            date.setDate(date.getDate() + 1);
                            const currDate = date.toISOString().split('T')[0];

                            return (
                                <div
                                    style={{
                                        position: 'relative',
                                        height: '100%',
                                        width: '100%',
                                    }}>
                                    <div className={styles.dateNum}>
                                        {arg.dayNumberText}
                                    </div>
                                    <Link to='/board/add'>
                                        <button
                                            className={`${styles.addBoard} ${buttons.button}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            disabled={isOverBoard(
                                                dateData[currDate] || [],
                                            )}>
                                            +
                                        </button>
                                    </Link>
                                    <div className={styles.titleContainer}>
                                        {dateData[currDate]?.map((todo) => (
                                            <div
                                                className={styles.registedBoard}
                                                key={todo.postId}
                                                onClick={() => {
                                                    handleTitleClick(todo.postId);
                                                }}>
                                                {overTitle(todo.title)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }}
                        datesSet={() => { // datesSet은 fullcalendar의 뷰가 변경될때마다 호출!!
                            setTimeout(() => {
                                const dayCells = document.querySelectorAll('.fc-daygrid-day');

                                dayCells.forEach((cell) => {
                                    const dateStr = cell.getAttribute('data-date');
                                    const todos = dateData[dateStr];
                                    if (todos?.length === 1) {
                                        cell.classList.add('oneTodo');
                                    } else if (todos?.length >= 2) {
                                        cell.classList.add('multiTodo');
                                    } else {
                                        cell.classList.remove('oneTodo', 'multiTodo');
                                    }
                                });
                            }, 0);
                        }}
                    />
                </div>
            </div>
            <div className={styles.todoContainer}>
                {data.exerciseTodoList && 
                    <TodoList
                        todoList={data.exerciseTodoList}
                        onDelete={getTodoList} // 삭제 후 상위에서 다시 목록 가져오기
                    />
                }
                {data.menuTodoList && 
                    <TodoList
                        todoList={data.menuTodoList}
                        onDelete={getTodoList}
                    />
                }
            </div>
        </div>
    );
}

export default OnesTodoPage;
