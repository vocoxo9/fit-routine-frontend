import { TiDeleteOutline } from 'react-icons/ti';

import styles from './Notification.module.css';
import NoticeIcon from 'components/layout/Header/Notification/NoticeIcon/NoticeIcon';

function Notification({ category, data, handleDelete }) {

    return (
        <>
            <div className={styles.notification}>
                <div className={styles.noticeHeader}>
                    <div className={styles.icon}>
                        <NoticeIcon category={category} />
                    </div>
                    <div className={styles.nickName}>
                        <div>{data.nickname}</div>
                        <div>{data.date}</div>
                    </div>
                    <div className={styles.deleteBtn} onClick={handleDelete}>
                        <TiDeleteOutline />
                    </div>
                </div>
                <div className={styles.noticeContent}>{data.message}</div>
            </div>
        </>
    );
}

export default Notification;
