import GenderImage from 'components/common/GenderImage/GenderImage';
import styles from './ReplyEdit.module.css';
import { useState } from 'react';
import { VscEdit } from 'react-icons/vsc';

/**
 * 댓글 수정 버튼 클릭시 나타내는 컴포넌트
 * 
 * @param {string} content 기존 댓글 내용
 * @param {number} replyId 기존 댓글 번호
 * @param {string} nickname 기존 댓글 작성자 닉네임
 * @param {string} gender 기존 댓글 작성자 성별
 */
function ReplyEdit ( {content='', replyId, nickname, gender} ) {

    const [text, setText] = useState(content);

    const handleTextarea = (event) => {
        setText(event.target.value);
    }

    return (
        <div className={`${styles.oneReply} `}>
            <div className={styles.replyHeader}>
                <div className={`${styles.headerdiv}`}>
                    <span className={styles.replyWriter}>{nickname}</span>
                </div>
            </div>
            <div className={styles.replyMain}>
                <div className={styles.genderImg}>
                    <GenderImage gender={gender} />
                </div>
                <div className={styles.replyContent}>
                    <textarea className={styles.textarea} value={text} onChange={(event)=>handleTextarea(event)}>
                    </textarea>
                </div>
            </div>
            <hr className={styles.horizon} />
        </div>
    )
}

export default ReplyEdit;