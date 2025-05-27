import Button from 'components/common/Button/Button';
import styles from './BellNotifications.module.css';

import Notification from 'components/layout/Header/Notification';
import { useEffect, useState } from 'react';

function BellNotifications () {
    const [data,setData] = useState([]);

    useEffect (() => {
        setData([
            {
                type: "todo",
                nickname: "minji_dev",
                date: "2025-05-27",
                message: "오늘 할 일 '여행 일정 정리'를 잊지 마세요!",
              },
              {
                type: "like",
                nickname: "coder_lee",
                date: "2025-05-27",
                message: "회원님이 작성한 글에 좋아요를 눌렀습니다.",
              },
              {
                type: "reply",
                nickname: "travel_jane",
                date: "2025-05-26",
                message: "댓글에 대한 답글이 달렸습니다.",
              },
              {
                type: "like",
                nickname: "dev_hoon",
                date: "2025-05-26",
                message: "사진 게시글에 좋아요가 추가되었습니다.",
              },
              {
                type: "todo",
                nickname: "system",
                date: "2025-05-27",
                message: "내일 일정: '여행지 투표 마감'을 확인하세요.",
              },
        ]);
    }, []);

    // 알림 데이터를 삭제하고, 
    // 알림 테이블의 데이터를 삭제하는 핸들러
    const handleDeleteAll = () => {
        setData([]);
        // 표시할 알림이 없습니다. 표시 후 알림 테이블 삭제
    }

    // 해당 인덱스의 데이터를 삭제하고, 
    // 해당 인덱스 번호의 알림번호를 삭제하는 핸들러
    const handleNoticeDelete = () => {

    }
    
    return (
        <div className={styles.notificationsArea}>
            <div className={styles.topArea}>
                <div className={styles.title}>
                    알림
                </div>
                <div className={styles.allDeleteBtn} 
                    onClick={handleDeleteAll}>
                    <Button 
                        size='small' 
                        text='전체 삭제' 
                    />
                </div>
            </div>
            <div className={styles.bottomArea}>
                {
                    data.length === 0 ? (
                        <p>알림이 없습니다.</p>
                    ) : (
                        data.map((notice, noticeIndex) => (
                            <Notification 
                                key={noticeIndex} 
                                type={notice.type} 
                                data={notice} 
                                handleDelete={handleNoticeDelete}
                            />
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default BellNotifications;