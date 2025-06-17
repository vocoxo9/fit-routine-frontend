import styles from './BellNotifications.module.css';
import button from 'assets/styles/common/button.module.css';
import Notification from 'components/layout/Header/Notification/Notification';
import { useEffect, useState } from 'react';
import { getNotification, deleteNotice, deleteNoticeAll } from 'utils/api/headerApi.js';
import { isLoggedIn } from 'utils/helpers/token.js';

function BellNotifications() {
    const [data, setData] = useState([]);

    
    useEffect(() => {
        const token = isLoggedIn();
        if (token) {
            fetchNotification();
        }
    }, []);

    const fetchNotification = async () => {
        try {
            const result = await getNotification();
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }

    // 알림 데이터를 삭제하고,
    // 알림 테이블의 데이터를 삭제하는 핸들러
    const handleDeleteAll = () => {
        deleteNoticeAll();
        setData([]);
        // 알림 테이블 삭제
    };

    // 해당 인덱스의 데이터를 삭제하고,
    // 해당 인덱스 번호의 알림번호를 삭제하는 핸들러
    const handleNoticeDelete = (noticeId) => {
        deleteNotice(noticeId);

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
                            content={notice.content}
                            createdAt={notice.createdAt}
                            nickname={notice.nickname}
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
