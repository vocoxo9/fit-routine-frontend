import { useEffect, useState } from 'react';
import styles from './BoardDetail.module.css';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import buttons from 'assets/styles/common/button.module.css';
import Likes from 'components/common/Likes/Likes';
import ReplyInput from 'components/blog/ReplyInput/ReplyInput';
import Reply from 'components/blog/Reply/Reply';
import { useNavigate, useParams } from 'react-router-dom';
import {
    addPostLikeByPostId,
    addReplyLikeByReplyId,
    checkPostOwner,
    deletePostByPostId,
    deletePostLikeByPostId,
    deleteReplyLikeByReplyId,
    getPostDetailByPostId,
    getPostImagesByPostId,
    getPostLikeByPostId,
    getReplyLikeByReplyId,
    getReplyListByPostId
} from 'utils/api/blogApi';

function BoardDetail() {
    const { boardId } = useParams();
    const [imgCount, setImgCount] = useState(0);
    const [boardData, setBoardData] = useState({
        title: '',
        content: '',
        nickname: '',
        createdAt: '',
        images: [],
    });
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [replyList, setReplyList] = useState([]);
    const [replyLikeList, setReplyLikeList] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();

    const groupedReplied = (list) => {
        const parentList = list.filter(item => item.parentId === null);
        return parentList.map(parent => ({
            ...parent,
            child: list.filter(item => item.parentId === parent.replyId),
        }));
    };

    useEffect(() => {
        checkPostOwner(boardId).then(data => {
            setIsOwner(data);
        });

        getPostDetailByPostId(boardId).then(data => {
            setBoardData(data);
        });

        getPostImagesByPostId(boardId).then(data => {
            setBoardData(prev=> ({
                ...prev,
                images: data || [],
            }));
        });

        getPostLikeByPostId(boardId).then(data => {
            setLikeCount(data.count);
            setIsLiked(data.liked);
        });

        getReplyListByPostId(boardId).then(data => {
            const formatted = data.map(reply => ({
                ...reply,
                gender: reply.gender == 'M' ? 'male' : 'female',
                createdAt: new Date(reply.createdAt).toISOString().slice(0, 10),
            }));
        
            setReplyList(formatted);
        });
    }, [boardId]);

    useEffect(() => {
        const fetchReplyLikes = async () => {
            const results = await Promise.all(
                replyList.map(item =>
                    getReplyLikeByReplyId(item.replyId).then(data => ({
                        replyId: item.replyId,
                        likeCount: data.count,
                        isLiked: data.liked,
                    }))
                )
            );
            
            setReplyLikeList(results);
        };

        if (replyList.length > 0) {
            fetchReplyLikes();
        }
    }, [replyList]);

    const prevImgHandler = () => {
        setImgCount(imgCount === 0 ? boardData.images.length - 1 : imgCount - 1);
    };

    const nextImgHandler = () => {
        setImgCount(imgCount === boardData.images.length - 1 ? 0 : imgCount + 1);
    };

    const boardEditHandler = () => {
        navigate('/board/edit/' + boardId);
    };

    const boardDeleteHandler = async (event) => {
        event.preventDefault();
        if (window.confirm('해당 게시물을 삭제하시겠습니까?')) {
            await deletePostByPostId(boardId);
            alert('삭제되었습니다.');
            navigate('/blog'); // 삭제 후 이동
        }
    };

    const handleBoardLikeClick = async () => {
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setLikeCount(prev => newLiked ? prev + 1 : prev - 1);

        if (newLiked) {
            await addPostLikeByPostId(boardId);
        } else {
            await deletePostLikeByPostId(boardId);
        }
    };

    const handleReplyLikeClick = async (replyId) => {
        const target = replyLikeList.find(item => item.replyId === replyId);
        if (!target) return;

        const newLiked = !target.isLiked;

        setReplyLikeList(prev =>
            prev.map(item =>
                item.replyId === replyId
                    ? {
                        ...item,
                        likeCount: newLiked ? item.likeCount + 1 : item.likeCount - 1,
                        isLiked: newLiked,
                    }
                    : item
            )
        );

        if (newLiked) {
            await addReplyLikeByReplyId(replyId);
        } else {
            await deleteReplyLikeByReplyId(replyId);
        }
    };

    const changeReply = (id, content) => {
        const updatedList = replyList.map(data =>
            data.replyId === id ? { ...data, content } : data
        );
        setReplyList(updatedList);
    };

    const addReply = (content) => {
        setReplyList(prev => [...prev, content]);
    };

    const deleteReplyFromList = (id) => {
        setReplyList(prev =>
            prev.filter(reply => reply.replyId !== id && reply.parentId !== id)
        );
    };

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.boardTitle}>
                    <span>{boardData.title}</span>
                    <div className={styles.boardEditContainer}>
                        {isOwner &&
                        <>
                        <div className={styles.editBtns}>
                            <button className={`${buttons.button} ${buttons.short}`} onClick={boardEditHandler}>
                                수정
                            </button>
                        </div>
                        <div className={styles.deleteBtns}>
                            <button className={`${buttons.button} ${buttons.short}`} onClick={boardDeleteHandler}>
                                삭제
                            </button>
                        </div>
                        </>
                        }
                    </div>
                </div>
                <br />
                <div className={styles.nameDate}>
                    {boardData.nickname} / {boardData.createdAt && new Date(boardData.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className={styles.flex}>
                {Array.isArray(boardData.images) && boardData.images.length > 0 && (
                    <div className={styles.imageContainer}>
                        <button className={styles.imgBtn} onClick={boardData.images.length ? prevImgHandler : undefined}>
                            <VscTriangleLeft />
                        </button>
                        <div className={styles.image}>
                                <img
                                    className={styles.img}
                                    src={`${process.env.REACT_APP_IMAGE_BASE_URL}${boardData.images[imgCount].changeName}`}
                                    alt={boardData.images[imgCount].originName}
                                />
                        </div>
                        <button className={styles.imgBtn} onClick={boardData.images.length ? nextImgHandler : undefined}>
                            <VscTriangleRight />
                        </button>
                    </div>
                )}
            </div>

            <br />
            <div className={styles.boardContent}>
                {boardData.content?.split('\n').map((line, idx) => (
                    <span key={idx}>
                        {line}
                        <br />
                    </span>
                ))}
            </div>

            <div className={styles.heartContainer}>
                <Likes
                    count={likeCount}
                    isLiked={isLiked}
                    isBig={true}
                    onClick={handleBoardLikeClick}
                />
            </div>

            <ReplyInput postId={boardId} addReply={addReply} />

            <div className={styles.replyListContainer}>
            {groupedReplied(replyList).map(parent => {
                const parentLike = replyLikeList.find(item => item.replyId === parent.replyId);

                return (
                <div key={parent.replyId}>
                    <Reply
                    key={parent.replyId}
                    postId={boardId}
                    replyId={parent.replyId}
                    content={parent.content}
                    blogId={parent.blogId}
                    likeCount={parentLike?.likeCount || 0}
                    isLiked={parentLike?.isLiked || false}
                    likeOnClick={() => handleReplyLikeClick(parent.replyId)}
                    changeReply={changeReply}
                    addReply={addReply}
                    deleteReply={deleteReplyFromList}
                    />
                    {parent.child.map(child => {
                    const childLike = replyLikeList.find(item => item.replyId === child.replyId);

                    return (
                        <Reply
                        key={child.replyId}
                        postId={boardId}
                        blogId={child.blogId}
                        content={child.content}
                        replyId={child.replyId}
                        likeCount={childLike?.likeCount || 0}
                        isLiked={childLike?.isLiked || false}
                        likeOnClick={() => handleReplyLikeClick(child.replyId)}
                        changeReply={changeReply}
                        addReply={addReply}
                        deleteReply={deleteReplyFromList}
                        />
                    );
                    })}
                </div>
                );
            })}
            </div>

        </div>
    );
}

export default BoardDetail;
