import { RxCalendar } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";

import styles from './Notification.module.css';


function Notification ({ type, data, handleDelete }) {
    let icon = '';
    if (type === 'todo') {
        icon = <RxCalendar />;
    } else if (type === 'like') {
        icon = <FaRegHeart />;
    } else if (type === 'reply') {
        icon = <LuPencilLine />;
    }

    return (
        <>
            <div className={styles.notification}>
                <div className={styles.noticeHeader}>
                    <div className={styles.icon}>
                            {icon}
                    </div>
                    <div className={styles.nickName}>
                        <div>{data.nickname}</div>
                        <div>{data.date}</div>
                    </div>
                    <div className={styles.deleteBtn} onClick={handleDelete}>
                        <TiDeleteOutline />
                    </div>
                </div>
                <div className={styles.noticeContent}>
                        {data.message}
                </div>
            </div>
        </>
    );
}

export default Notification;