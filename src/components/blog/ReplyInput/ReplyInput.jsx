import { VscSend } from 'react-icons/vsc';
import styles from './ReplyInput.module.css';

/**
 * 댓글 입력칸 컴포넌트
 * 
 * @param {string} [size] 일반 댓글 입력칸인지 대댓글 입력칸인지 여부 / small : 대댓글
 * @param {number} [replyId] 댓글 번호 (대댓글 입력칸일때만 사용)
 */
export default function ReplyInput(
    {
        size,
        replyId = ""
    }
) {

    // 버튼 누르면 댓글 입력 요청 및 입력창 초기화 함수
    const replyHandler = () => {
        const text = document.getElementById("reply"+replyId);
        text.value = "";
    }

    return (
        <div className={`${styles.replyInputContainer} ${styles[size]}`}>
                <textarea className={styles.replyInput} id={`reply${replyId}`}/>
                <button className={styles.inputBtn} onClick={replyHandler}><VscSend/></button>
        </div>
    )
}