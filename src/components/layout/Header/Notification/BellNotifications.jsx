import styles from './BellNotifications.module.css';
import button from 'assets/styles/common/button.module.css';
import Notification from 'components/layout/Header/Notification/Notification';
import { useEffect, useState } from 'react';

function BellNotifications() {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            {
                noticeId: 1,
                category: 'todo',
                nickname: 'minji_dev',
                date: '2025-05-27',
                message: "오늘 할 일 '여행 일정 정리'를 잊지 마세요!",
            },
            {
                noticeId: 2,
                category: 'follow',
                nickname: 'coder_lee',
                date: '2025-05-27',
                message: '회원님이 블로글를 관심 등록 하였습니다.',
            },
            {
                noticeId: 3,
                category: 'reply',
                nickname: 'travel_jane',
                date: '2025-05-26',
                message: '댓글에 대한 답글이 달렸습니다.',
            },
            {
                noticeId: 4,
                category: 'like',
                nickname: 'dev_hoon',
                date: '2025-05-26',
                message: '사진 게시글에 좋아요가 추가되었습니다.',
            },
            {
                noticeId: 5,
                category: 'todo',
                nickname: 'system',
                date: '2025-05-27',
                message: "내일 일정: '여행지 투표 마감'을 확인하세요.",
            },
        ]);
    }, []);

    // 알림 데이터를 삭제하고,
    // 알림 테이블의 데이터를 삭제하는 핸들러
    const handleDeleteAll = () => {
        setData([]);
        // 알림 테이블 삭제
    };

    // 해당 인덱스의 데이터를 삭제하고,
    // 해당 인덱스 번호의 알림번호를 삭제하는 핸들러
    const handleNoticeDelete = (noticeId) => {
        // 전달받은 noticeId는 해당 알림의 noticeId(PK값)
        setData((prev) =>
            prev.filter((notice) => notice.noticeId !== noticeId),
        );
        // 알림 테이블의 해당 데이터 삭제
    };

    return (
        <div className={styles.notificationsArea}>
            <div className={styles.topArea}>
                <div className={styles.title}>알림</div>
                <div className={styles.allDeleteBtn}>
                    <button
                        className={button.button}
                        onClick={handleDeleteAll}
                    >
                        전체삭제
                    </button>
                </div>
            </div>
            <div className={styles.bottomArea}>
                {data.length === 0 ? (
                    <p className={styles.p}>알림이 없습니다.</p>
                ) : (
                    data.map((notice, noticeIndex) => (
                        <Notification
                            key={noticeIndex}
                            category={notice.category}
                            data={notice}
                            handleDelete={() =>
                                handleNoticeDelete(notice.noticeId)
                            }
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default BellNotifications;
