import { GrSend } from "react-icons/gr";
import styles from './ReplyInput.module.css';
import buttons from 'assets/styles/common/button.module.css';
import { useRef, useState } from "react";
import textarea from 'assets/styles/common/textarea.module.css';
import { addReplyByPayload, getBlogDetailByToken } from "utils/api/blogApi";

/**
 * 댓글 입력칸 컴포넌트
 *
 * @param {number} postId 참조할 게시글 번호
 * @param {string} [size] 일반 댓글 입력칸인지 대댓글 입력칸인지 여부 / small : 대댓글
 * @param {number} [parentId] 댓글 번호 (대댓글 입력칸일때만 사용)
 * @param {number} [addReply] 댓글 추가 클릭시 실행되는 함수
 */
function ReplyInput({ postId, size, parentId=null, addReply }) {
    
    const [content, setContent] = useState('');

    // 버튼 누르면 댓글 입력 요청 및 입력창 초기화 함수
    const replyHandler = async () => {

        const payload = {
            parentId: parentId,
            content: content,
        }
        const userData = await getBlogDetailByToken();
        const addreply = await addReplyByPayload(postId, payload);
        const data = {
            replyId: addreply.replyId,
            blogId:userData.blogId,
            gender:userData.gender === 'M' ? 'male' : 'female',
            nickname : userData.nickname,
            content: addreply.content,
            createdAt: new Date(addreply.createdAt).toISOString().slice(0, 10),
            parentId:addreply.parentId?addreply.parentId:null,
            likeCount:0,
            isLiked:false,
        }
        
        addReply(data);

        setContent('');
    };

    return (
        <div className={`${styles.replyInputContainer} ${styles[size]}`}>
            <textarea className={`${styles.replyInput} ${textarea.textarea}`} value={content} onChange={event=>setContent(event.target.value)}/>
            <button className={`${buttons.button} ${styles.inputBtn} ${size && styles.reComment}`} onClick={replyHandler}>
                <GrSend />
            </button>
        </div>
    );
}

export default ReplyInput;
