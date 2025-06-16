import { TiDeleteOutline } from 'react-icons/ti';

import styles from './Notification.module.css';
import NoticeIcon from 'components/layout/Header/Notification/NoticeIcon/NoticeIcon';

function Notification({ category, content, createdAt, nickname, handleDelete }) {

    return (
        <>
            <div className={styles.notification}>
                <div className={styles.noticeHeader}>
                    <div className={styles.icon}>
                        <NoticeIcon category={category} />
                    </div>
                    <div className={styles.nickName}>
                        <div>{nickname}</div>
                        <div>{createdAt}</div>
                    </div>
                    <div className={styles.deleteBtn} onClick={handleDelete}>
                        <TiDeleteOutline />
                    </div>
                </div>
                <div className={styles.noticeContent}>{content}</div>
            </div>
        </>
    );
}

export default Notification;
