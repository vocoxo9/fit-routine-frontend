import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import "./FullCalendar.css";
import styles from './OnesTodoPage.module.css';
import {useEffect, useState} from 'react';

export default function OnesTodoPage() {
    const [dateData, setDateData] = useState({});

    const fetchAllData = async () => {
        // axios로 전체 todo 조회
        const data = {
            '2025-05-01': [
                { id: 1, title: '오운완아진짜아 알베겼어' },
                { id: 2, title: '오식완' },
                { id: 3, title: '가'}
            ],
            '2025-05-03': [
                { id: 3, title: '회식' }
            ],
            '2025-05-10': [
                { id: 4, title: '스터디' }
            ]
        };
        return data;
    };

    // 페이지 로딩 시 모든 날짜 데이터 로드
    useEffect(() => {
        const loadInitialData = async () => {
            const data = await fetchAllData();
            setDateData(data); // 전체 날짜별 데이터 세팅
        };
        loadInitialData();
    }, []);

    // 달력에 표시할 제목이 너무 길면 ...으로 축약
    const overTitle = (title) => {
        if(title.length > 11){
            return title.slice(0, 10) + '...';
        }
        return title;
    }

    // 게시물이 3개까지 꽉 찼다면 + 버튼 비활성화
    const isOverBoard = (data) => {
        if(data.length >= 3) {
            return true;
        }
    }

    return (
        <div className='todoPage todoPage-main container'>
            <div className={styles.nameGrade}>
                <span className={styles.name}>유성재 &nbsp;
                    <span className={styles.TODOText}>TODO</span>
                </span>
                <span className={styles.grade}>S</span>
            </div>

            <div className={styles.calendarContainer}>
                <div className={styles.fullCalendar}>
                    <FullCalendar
                    key={JSON.stringify(dateData)} // 상태 변경 시 리렌더 유도하는 속성. 외부에서 컴포넌트 사용할때 key예약어로 값을 지정하면 값에 변경이 있을때마다 리렌더를 시킨다.
                    plugins={[dayGridPlugin, interactionPlugin]} // dayGridPlugin : 한 달 달력 보기, interactionPlugin : 클릭, 선택 등 사용자 상호작용 활성화
                    initialView="dayGridMonth" // initialView : 처음 렌더링으로 어떤 뷰가 보일것인가?, dayGridMonth : 한 달 단위로 날짜를 그리드 형태로 보기
                    locale={koLocale}  // 한국어 설정
                    dayCellContent={(arg) => {  // 각 날짜에 보여줄 것을 정의
                        const date = new Date(arg.date);
                        date.setDate(date.getDate() + 1);
                        const currDate = date.toISOString().split("T")[0];

                        return (
                        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                            <div className={styles.dateNum}>
                            {arg.dayNumberText}
                            </div>
                            <button
                            className={styles.addBoard}
                            onClick={(e) => {
                                e.stopPropagation();
                                alert(`${currDate} 클릭됨`);
                            }}
                            disabled={isOverBoard(dateData[currDate] || [])}
                            >
                            +
                            </button>
                            {dateData[currDate]?.map(todo => (
                            <div className={styles.registedBoard} key={todo.id}>
                                {overTitle(todo.title)}
                            </div>
                            ))}
                        </div>
                        );
                    }}
                    dayCellDidMount={(info) => {  // DOM이 렌더링된 후처리에 대한 함수 작성
                        const date = new Date(info.date);
                        date.setDate(date.getDate() + 1);
                        const currDate = date.toISOString().split("T")[0];

                        const todos = dateData[currDate];
                        if (todos?.length === 1) {
                            info.el.classList.add("oneTodo");
                        } else if (todos?.length >= 2) {
                            info.el.classList.add("multiTodo");
                        }

                    }}
                    />

                </div>
            </div>
            <div className={styles.todoContainer}>
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
                <div className={styles.listText}>
                    <span className={styles.headerText}>TODO 식단</span>
                    <span className={styles.periodText}>*기간 : 2023.01.01 ~ 2023.01.07 (7일)</span>
                    <div className={styles.todayList}>오늘의 식단 (총 1197kcal)
                        <ul className={styles.ul}>
                            <li>북어조림 (182kcal)</li>
                            <li>모듬회 (133kcal)</li>
                            <li>달걀_삶은것 (150kcal) </li>
                            <li>장조림_돼지고기_메추리알 (127kcal)</li>
                            <li>콩조림(콩자반) (271kcal)</li>
                            <li>닭다리조림 (179kcal)</li>
                            <li>멸치조림 (150kcal)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
