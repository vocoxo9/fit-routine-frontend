import GenderImage from "components/common/genderImage/GenderImage";
import Likes from "components/common/Likes/Likes";
import { VscEdit, VscIndent, VscTrash } from "react-icons/vsc";
import ReplyInput from "../ReplyInput/ReplyInput";
import styles from './Reply.module.css';

/**
 * 
 * @param {string} nickname 댓글 작성자 닉네임
 * @param {string} replyDate 댓글 작성 날짜
 * @param {string} gender 댓글 작성자 성별
 * @param {string} replyContent 댓글 내용
 * @param {number} replyId 댓글 번호
 */
export default function Reply(
    {
        nickname,
        replyDate,
        gender,
        replyContent,
        replyId
    }
) {

    //날짜 계산 함수 필요
    

    // 댓글 달기 눌렀을때 댓글 입력칸 나오도록
    const showReplyInput = ({replyId}) => {
        const replyInputBox = document.getElementById("replyId");
        const state = ((replyInputBox.style.display === 'flex') ? 'none':'flex');
        replyInputBox.style.display = state;
        
    }

    return (
        <div className={styles.oneReply}>
                    <div className={styles.replyHeader}>
                        <span className={styles.replyWriter}>다이어트는 내일부터</span>
                        <span className={styles.edit}><VscEdit/></span>
                        <span className={styles.trash}><VscTrash/></span>
                        <span className={styles.replyDate}>1일전</span>

                    </div>
                    <div className={styles.replyMain}>
                        <div className={styles.genderImg}><GenderImage gender={'male'}/></div>
                        <div className={styles.replyContent}>
                            {
                        ("안녕하세요.\n\n제 이름은 김일현입니다.\n잘 부탁드립니다.\n진짜 운동 사실 너무 하기 싫어요.\n살려줘요 팀장님 너무 힘드러어어어")
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
                        <div className={styles.replyBtn} onClick={showReplyInput}>댓글 달기</div>
                        <div className={styles.likeBtn}><Likes count={21}/></div>
                    </div>
                    <hr className={styles.horizon}/>
                    <div className={styles.reComment} id='replyId'>
                        {/* 전달받은 replyId로 id값을 판별예정 */}
                        <div className={styles.arrow}><VscIndent/></div>
                        <ReplyInput replyId={1} size={'small'}/>
                    </div>
                </div>
    )
}