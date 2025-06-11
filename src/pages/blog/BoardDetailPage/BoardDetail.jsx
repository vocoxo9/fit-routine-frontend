import { useEffect, useState } from 'react';
import styles from './BoardDetail.module.css';
import {
    VscTriangleLeft,
    VscTriangleRight,
} from 'react-icons/vsc';
import buttons from 'assets/styles/common/button.module.css';
import Likes from 'components/common/Likes/Likes';
import ReplyInput from 'components/blog/ReplyInput/ReplyInput';
import Reply from 'components/blog/Reply/Reply';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBoardDetailWithLike } from 'utils/api/blogApi';

/**
 * 게시물 상세 정보 페이지
 */
function BoardDetail() {
    const { boardId } = useParams(); // <Route path="/blog/boardDetail/:boardId" element={<BoardDetail />} />
    const [imgCount, setImgCount] = useState(0);
    const [boardData, setBoardData] = useState({
        title: '',
        content: '',
        nickname: '',
        createdAt: '',
        likeCount: 0,
        liked: false,
        images: [],
    });
    const [boardLike, setBoardLike] = useState({});
    const [replyList, setReplyList] = useState([]);
    const [replyLikeList, setReplyLikeList] = useState([]);

    const navigate = useNavigate();

    const dummyReply = [
        {nickname:'성쟁가말을한다아',date:new Date(2024, 1, 13),gender:'male',content:'배고파\n근데이렇게\n길다면\n어떻게되는거',replyId:1,reCommentId:null,likeCount:2,isLiked:false},
        {nickname:'잉형',date:new Date(2024, 1, 28),gender:'male',content:'밥먹어',replyId:2,reCommentId:3,likeCount:33,isLiked:true},
        {nickname:'밍영',date:new Date(2024, 3, 6),gender:'male',content:'공부해',replyId:3,reCommentId:null,likeCount:12,isLiked:true},
        {nickname:'혱영',date:new Date(2024, 5, 24),gender:'female',content:'놀아',replyId:4,reCommentId:1,likeCount:35,isLiked:false},
    ]

    const makeLikeObject = (likeCount, isLiked, replyId) => {
        if(replyId  === undefined){
            return {
                likeCount:likeCount,
                isLiked:isLiked,
            };
        } else {
            return {
                likeCount:likeCount,
                isLiked:isLiked,
                replyId:replyId,
            }
        }
    }

    // 부모 댓글 기준으로 filter 후 각 부모에게 자식 댓글 배열로 추가
    const groupedReplied = (list) => {
        const parentList = list.filter(item=>item.reCommentId === null);
        const groupedList = parentList.map(parent=>({
            ...parent,
            child:list.filter(item=>item.reCommentId === parent.replyId),
        }));
        return groupedList;
    }

    useEffect(() => {
        getBoardDetailWithLike(boardId).then(data => {
            setBoardData(data);
            setBoardLike(makeLikeObject(data.likeCount, data.liked));
        });

        // axios - boardId와 토큰으로 댓글 목록 요청 해야함
        const list = dummyReply.map((item) => 
            makeLikeObject(item.likeCount, item.isLiked, item.replyId)
        );
        
        setReplyLikeList(list);
        setReplyList(dummyReply);
        
    }, [boardId]);

    useEffect(()=>{
        const list = replyList.map((item) => 
            makeLikeObject(item.likeCount, item.isLiked, item.replyId)
        );
        
        setReplyLikeList(list);
    }, [replyList])

    const prevImgHandler = () => {
        const count = imgCount === 0 ? boardData.images.length - 1 : imgCount - 1;
        setImgCount(count);
    };

    const nextImgHandler = () => {
        const count = boardData.images.length - 1 === imgCount ? 0 : imgCount + 1;
        setImgCount(count);
    };

    // 수정 클릭시 해당 게시물에대한 수정 페이지로 이동 함수
    const boardEditHandler = () => {
        navigate('/board/edit/' + boardId);
    };

    // 삭제 클릭시 삭제 여부 + 삭제 api 요청 함수
    const boardDeleteHandler = () => {
        const isDelete = window.confirm('해당 게시물을 삭제하시겠습니까?');
        if (isDelete === true) {
            alert('삭제!');
            // api요청
        }
    };

    const handleBoardLikeClick = () => {
        setBoardLike(prev => ({
            likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
            isLiked: !prev.isLiked,
        }));
    };

    const handleReplyLikeClick = (replyId) => {
        setReplyLikeList(prev =>
            prev.map(item =>
            item.replyId === replyId ? 
                {
                    ...item,
                    likeCount: item.isLiked ? item.likeCount - 1 : item.likeCount + 1,
                    isLiked: !item.isLiked,
                }
                : item
            )
        );
    };

    // 댓글 수정 완료 후 버튼 클릭시 api 수정요청 및 댓글 리렌더링
    const changeReply = (id, content) => {
        
        const changeList = replyList.map((data)=>{
            if (data.replyId === id) data.content = content; 
            return data;
        });        

        // 추후 댓글 수정 api 작성
        
        setReplyList(changeList);
    }

    const addReply = (content) => {
        setReplyList(prev=>[...prev,content]);
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.boardTitle}>
                    <span>{boardData.title}</span>
                    <div className={styles.boardEditContainer}>
                        <div className={styles.editBtns}>
                            <button className={`${buttons.button} ${buttons.short}`}
                                onClick={boardEditHandler}
                            >
                                수정
                            </button>
                        </div>
                        <div className={styles.deleteBtns}>
                            <Link to='/board'>
                                <button className={`${buttons.button} ${buttons.short}`}
                                    onClick={boardDeleteHandler}
                                >
                                    삭제
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <br />
                <div className={styles.nameDate}>
                    {boardData.nickname} / {boardData.createdAt && new Date(boardData.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className={styles.flex}>
                <div className={styles.imageContainer}>
                    <button className={styles.imgBtn} onClick={boardData.images.length !== 0 && prevImgHandler}>
                        <VscTriangleLeft />
                    </button>
                    <div className={styles.image}>
                        {boardData.images && boardData.images.length > 0 &&
                            <img className={styles.img}
                                src={boardData.images[imgCount].changeName}
                                alt={boardData.images[imgCount].originName}
                        />}
                    </div>
                    <button className={styles.imgBtn} onClick={boardData.images.length !== 0 && nextImgHandler}>
                        <VscTriangleRight />
                    </button>
                </div>
            </div>
            <br />
            <div className={styles.boardContent}>
                {boardData.content && boardData.content.split('\n').map((line, idx) => (
                    <span key={idx}>
                        {line}
                        <br />
                    </span>
                ))}
            </div>

            <div className={styles.heartContainer}>
                {boardLike.likeCount && 
                    <Likes 
                        count={boardLike.likeCount} 
                        isLiked={boardLike.liked} 
                        isBig={true} 
                        onClick={handleBoardLikeClick}    
                    />
                }
            </div>

            <ReplyInput boardId={boardId} addReply={addReply}/>

            <div className={styles.replyListContainer}>
                {replyList && 
                groupedReplied(replyList).map(parent => (
                    <div key={parent.replyId}>
                        <Reply
                            key={parent.replyId}
                            nickname={parent.nickname}
                            replyDate={parent.date}
                            gender={parent.gender}
                            replyId={parent.replyId}
                            replyContent={parent.content}
                            reCommentId={parent.reCommentId}
                            like={replyLikeList.find(item=>item.replyId === parent.replyId)}
                            likeOnClick={() => handleReplyLikeClick(parent.replyId)}
                            changeReply={changeReply}
                            addReply={addReply}
                        />
                        {parent.child.map(child => (
                        <Reply
                            key={child.replyId}
                            nickname={child.nickname}
                            replyDate={child.date}
                            gender={child.gender}
                            replyId={child.replyId}
                            replyContent={child.content}
                            reCommentId={child.reCommentId}
                            like={replyLikeList.find(item=>item.replyId === child.replyId)}
                            likeOnClick={() => handleReplyLikeClick(child.replyId)}
                            changeReply={changeReply}
                            addReply={addReply}
                        />
                        ))}
                    </div>
                ))}

            </div>
        </div>
    );
}

export default BoardDetail;
