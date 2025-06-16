import GenderImage from 'components/common/GenderImage/GenderImage';
import Likes from 'components/common/Likes/Likes';
import { VscEdit, VscIndent, VscTrash } from 'react-icons/vsc';
import ReplyInput from '../ReplyInput/ReplyInput';
import { calcDay } from 'utils/helpers/calculator';
import styles from './Reply.module.css';
import { useEffect, useRef, useState } from 'react';
import ReplyEdit from '../ReplyEdit/ReplyEdit';
import { useNavigate } from 'react-router-dom';
import { checkReplyOwner, deleteReplyByReplyId, editReplyContentByReplyId, getReplyDataByReplyId } from 'utils/api/blogApi';

/**
 *
 * @param {number} replyId 댓글 번호
 * @param {object} like 좋아요 수, 클릭여부 (likeCount:0, isLiked:false)
 * @param {function} likeOnClick Like컴포넌트에 전달될 onClick이벤트
 * @param {function} changeReply ReplyEdit컴포넌트에 onClick이벤트 발생 시 실행할 함수
 * @param {function} addReply ReplyInput컴포넌트에 onClick이벤트 발생 시 실행할 함수
 */
function Reply({
    blogId,
    postId,
    replyId,
    likeCount,
    isLiked,
    likeOnClick,
    content,
    changeReply,
    addReply,
    deleteReply,
}) {
    const replyInputRef = useRef(null);
    const navigate = useNavigate();
    const [editIsClicked, setEditIsClicked] = useState(false);
    const [replyData, setReplyData] = useState(null); 
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        checkReplyOwner(replyId).then(data => {
            setIsOwner(data);
        });

        async function fetchData() {
            const data = await getReplyDataByReplyId(replyId);
            setReplyData(data);
        }
        fetchData();
    }, [replyId]);

    const showReplyInput = () => {
        const el = replyInputRef.current;
        if (!el) return;
        el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
    };

    const handleEditReply = () => {
        setEditIsClicked(true);
    }

    const handleDeleteReply = async () => {
        // eslint-disable-next-line
        const answer = confirm('댓글을 삭제하시겠습니까?');
        if (answer) {
            await deleteReplyByReplyId(replyId);
            deleteReply(replyId);
        }
    }

    const handleEditSubmit = async (content) => {
        setEditIsClicked(false);
        const payload = {
            replyId: replyId,
            content: content
        }
        const data = await editReplyContentByReplyId(payload);
        changeReply(data.replyId, data.content);
    }

    const handleNicknameClick = () => {
        navigate(`/blog/${replyData.blogId}`);
    }

    if (!replyData) return null;

    return (
        <>
            {!editIsClicked &&
                <div className={`${styles.oneReply} ${replyData.parentId && styles.reCommentContainer}`}>
                    <div className={styles.replyHeader}>
                        <div className={`${styles.headerdiv} ${replyData.parentId && styles.reCommentDiv}`}>
                            <span onClick={handleNicknameClick} className={styles.replyWriter}>
                                {replyData.nickname}
                            </span>
                            {isOwner && (
                            <div className={styles.buttonDiv}>
                                <span className={styles.edit} onClick={handleEditReply}>
                                    <VscEdit />
                                </span>
                                <span className={styles.trash} onClick={handleDeleteReply}>
                                    <VscTrash />
                                </span>
                            </div>
                            )}

                            <span className={styles.replyDate}>{calcDay(replyData.createdAt)}일전</span>
                        </div>
                    </div>
                    <div className={styles.replyMain}>
                        <div className={styles.genderImg}>
                            <GenderImage gender={replyData.gender === 'M' ? 'male' : 'female'} />
                        </div>
                        <div className={styles.replyContent}>
                            {content}
                        </div>
                    </div>
                    <div className={styles.replyFooter}>
                        {!replyData.parentId && <div className={styles.replyBtn} onClick={showReplyInput}>
                            댓글 달기
                        </div>}
                        <div className={styles.likeBtn}>
                            <Likes count={likeCount} isLiked={isLiked} onClick={likeOnClick} />
                        </div>
                    </div>
                    <hr className={styles.horizon} />
                    <div className={styles.reComment} ref={replyInputRef} style={{ display: 'none' }}>
                        <div className={styles.arrow}>
                            <VscIndent />
                        </div>
                        <ReplyInput postId={postId} parentId={replyData.replyId} size={'small'} addReply={addReply} />
                    </div>
                </div>
            }
            {editIsClicked &&
                <div className={styles.editContainer}>
                    <ReplyEdit
                        content={replyData.content}
                        replyId={replyData.replyId}
                        nickname={replyData.nickname}
                        gender={replyData.gender === 'M' ? 'male' : 'female'}
                        onClick={handleEditSubmit}
                    />
                </div>
            }
        </>
    );
}


export default  Reply;