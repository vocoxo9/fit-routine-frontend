import { GrSend } from "react-icons/gr";
import styles from './ReplyInput.module.css';
import buttons from 'assets/styles/common/button.module.css';

/**
 * 댓글 입력칸 컴포넌트
 *
 * @param {number} boardId 참조할 게시글 번호
 * @param {string} [size] 일반 댓글 입력칸인지 대댓글 입력칸인지 여부 / small : 대댓글
 * @param {number} [reCommentId] 댓글 번호 (대댓글 입력칸일때만 사용)
 */
function ReplyInput({ boardId, size, reCommentId=null }) {
    // 버튼 누르면 댓글 입력 요청 및 입력창 초기화 함수
    const replyHandler = () => {
        const text = document.getElementById('reply' + reCommentId);
        
        // axios.post('blog/boardDetail/replyInput', { boardId:boardId, replyId:replyId,
        //                                               token:token, content:content})

        text.value = '';
    };

    return (
        <div className={`${styles.replyInputContainer} ${styles[size]}`}>
            <textarea className={styles.replyInput} id={`reply${reCommentId}`} />
            <button className={`${buttons.button} ${styles.inputBtn} ${size && styles.reComment}`} onClick={replyHandler}>
                <GrSend />
            </button>
        </div>
    );
}

export default ReplyInput;