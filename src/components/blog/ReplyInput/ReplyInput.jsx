import { GrSend } from "react-icons/gr";
import styles from './ReplyInput.module.css';
import buttons from 'assets/styles/common/button.module.css';
import { useEffect, useState } from "react";
import textarea from 'assets/styles/common/textarea.module.css';

/**
 * 댓글 입력칸 컴포넌트
 *
 * @param {number} boardId 참조할 게시글 번호
 * @param {string} [size] 일반 댓글 입력칸인지 대댓글 입력칸인지 여부 / small : 대댓글
 * @param {number} [reCommentId] 댓글 번호 (대댓글 입력칸일때만 사용)
 * @param {number} [addReply] 댓글 추가 클릭시 실행되는 함수
 */
function ReplyInput({ boardId, size, reCommentId=null, addReply }) {
    const [content, setContent] = useState('');
    const inputRef = useRef(null);

    // 버튼 누르면 댓글 입력 요청 및 입력창 초기화 함수
    const replyHandler = async () => {
        const textarea = inputRef.current.value;

        // const login = axios-token;
        // if (login) { axios-boardId, reCommentId, content }
        // const data = axios.post('blog/boardDetail/replyInput', { boardId:boardId, reCommentId:reCommentId, token:token, content:content})
        // 여기서 data는 서비스단에서 저장 메소드 + 조회 메소드 후 조회한걸 바로 return

        // {nickname:'혱영',date:new Date(2024, 5, 24),gender:'female',content:'놀아',replyId:4,reCommentId:1,likeCount:35,isLiked:false}
        const data= {
            nickname:'성중',date:new Date(), gender:'male',content:content,replyId:25,reCommentId:reCommentId,likeCount:0,isLiked:false
        }
        addReply(data);

        setContent('');
    };

    return (
        <div className={`${styles.replyInputContainer} ${styles[size]}`}>
            <textarea className={`${styles.replyInput} ${textarea.textarea}`} ref={inputRef} value={content} onChange={e=>setContent(e.target.value)}/>
            <button className={`${buttons.button} ${styles.inputBtn} ${size && styles.reComment}`} onClick={replyHandler}>
                <GrSend />
            </button>
        </div>
    );
}

export default ReplyInput;
