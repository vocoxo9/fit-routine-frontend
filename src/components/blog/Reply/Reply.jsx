import GenderImage from 'components/common/GenderImage/GenderImage';
import Likes from 'components/common/Likes/Likes';
import { VscEdit, VscIndent, VscTrash } from 'react-icons/vsc';
import ReplyInput from '../ReplyInput/ReplyInput';
import { calcDay } from 'utils/helpers/calculator';
import styles from './Reply.module.css';
import { useRef, useState } from 'react';
import ReplyEdit from '../ReplyEdit/ReplyEdit';

/**
 *
 * @param {string} nickname 댓글 작성자 닉네임
 * @param {string} replyDate 댓글 작성 날짜
 * @param {string} gender 댓글 작성자 성별 (male, female)
 * @param {string} replyContent 댓글 내용
 * @param {number} replyId 댓글 번호
 * @param {number} [reCommentId] 참조한 댓글 번호
 * @param {object} like 좋아요 수, 클릭여부 (likeCount:0, isLiked:false)
 * @param {function} likeOnClick Like컴포넌트에 전달될 onClick이벤트
 * @param {function} changeReply ReplyEdit컴포넌트에 onClick이벤트 발생 시 실행할 함수
 * @param {function} addReply ReplyInput컴포넌트에 onClick이벤트 발생 시 실행할 함수
 */
function Reply({
    nickname,
    replyDate,
    gender,
    replyContent,
    replyId,
    reCommentId,
    like,
    likeOnClick,
    changeReply,
    addReply,
}) {
    const replyInputRef = useRef(null);
    const [editIsClicked, setEditIsClicked] = useState(false);

    // 댓글 달기 눌렀을때 댓글 입력칸 나오도록
    const showReplyInput = () => {
        const el = replyInputRef.current;
        if (!el) return;
        el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
    };

    const handleEditReply = () => {
        setEditIsClicked(true);
    }

    const handleDeleteReply = () => {
        // eslint-disable-next-line
        const answer = confirm(replyId+'댓글을 삭제하시겠습니까?');
        answer ? alert('삭제완료!') : alert('삭제 취소');
    }

    const handleEditSubmit = (content) => {
        setEditIsClicked(false);
        changeReply(replyId, content);
    }

    const handleNicknameClick = () => {
        // 라우터를 통해 nickname 블로그로 이동
        alert(nickname+'블로그 이동!');
    }

    return (
        <>
            {!editIsClicked &&
                <div className={`${styles.oneReply} ${reCommentId && styles.reCommentContainer}`}>
                    <div className={styles.replyHeader}>
                        <div className={`${styles.headerdiv} ${reCommentId && styles.reCommentDiv}`}>
                            <span onClick={handleNicknameClick} className={styles.replyWriter}>{nickname}</span>
                            <span className={styles.edit} onClick={handleEditReply}>
                                <VscEdit />
                            </span>
                        </div>
                        <span className={styles.trash} onClick={handleDeleteReply}>
                            <VscTrash />
                        </span>
                        <span className={styles.replyDate}>{calcDay(replyDate)}일전</span>
                    </div>
                    <div className={styles.replyMain}>
                        <div className={styles.genderImg}>
                            <GenderImage gender={gender} />
                        </div>
                        <div className={styles.replyContent}>
                            {replyContent
                                .split('\n')
                                .map((line, idx) => (
                                    <span key={idx}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                        </div>
                    </div>
                    <div className={styles.replyFooter}>
                        {!reCommentId && <div className={styles.replyBtn} onClick={showReplyInput}>
                            댓글 달기
                        </div>}
                        <div className={styles.likeBtn}>
                            {like &&
                            <Likes count={like.likeCount} isLiked={like.isLiked} onClick={likeOnClick}/>}
                        </div>
                    </div>
                    <hr className={styles.horizon} />
                    <div className={styles.reComment} id={replyId} ref={replyInputRef}>
                        <div className={styles.arrow}>
                            <VscIndent />
                        </div>
                        <ReplyInput reCommentId={replyId} size={'small'} addReply={addReply}/>
                    </div>
                </div>
            }
            {editIsClicked && 
                <div className={styles.editContainer}>
                    <ReplyEdit content={replyContent} replyId={replyId} nickname={nickname} gender={gender} onClick={handleEditSubmit}/>
                </div>
            }
        </>
    );
}

export default  Reply;