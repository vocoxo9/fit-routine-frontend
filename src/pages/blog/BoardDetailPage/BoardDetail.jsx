
import {useEffect, useState} from 'react';
import styles from './BoardDetail.module.css';
import {VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";

import Button from 'components/common/Button/Button';
import Likes from 'components/common/Likes/Likes';
import ReplyInput from 'components/blog/ReplyInput/ReplyInput';
import Reply from 'components/blog/Reply/Reply';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * 게시물 상세 정보 페이지
 */
export default function BoardDetail() {

    const { boardId } = useParams();    // <Route path="/blog/boardDetail/:boardId" element={<BoardDetail />} />


    const [imgCount, setImgCount] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date());
    const [writer, setWriter] = useState('');
    const navigate = useNavigate();

    const imgList = [
        {   /* 예시 이미지 리스트 */
            src:'jae3.jpg'
        },
        {
            src:'jae4.jpg'
        },
        {
            src:'jae5.jpg'
        }

    ];

    useEffect(()=>{
        // axios로 boardId로 게시물 정보 요청
        
        setTitle('운동 인증을 하는 이유');
        setContent('안녕하세요, 김일현입니다.'+'저는 소통과 협업을 중시하는 개발자로,'+
            '팀워크 속에서 성장하는 것을 즐깁니다.\n현재는 React, '+
            'Node.js 기반의 웹 개발에 주력하고 있으며, 사용자 중심의 UI/UX '+
            '설계에도 많은 관심을 가지고 있습니다. \n새로운 기술에 대한 호기심이'+
            ' 많아 꾸준히 학습하고, 문제 해결을 위해 논리적으로 사고하려 노력합니다.'+
            ' \n틈틈이 운동을 하며 건강도 챙기고, 다양한 사람들과의 교류를 통해 시야를 넓히고 있습니다.');
        setWriter('김일현');
        setDate(new Date());
    }, [])

    const prevImgHandler = () => {
        const count = imgCount === 0 ? imgList.length - 1 : imgCount - 1;
        setImgCount(count);
    };

    const nextImgHandler = () => {
        const count = imgList.length - 1 === imgCount ? 0 : imgCount + 1;
        setImgCount(count);
    };

    // 수정 클릭시 해당 게시물에대한 수정 페이지로 이동 함수
    const boardEditHandler = () => {
        // navigate('/board/edit?boardId='+boardId);
    };

    // 삭제 클릭시 삭제 여부 + 삭제 api 요청 함수
    const boardDeleteHandler = () => {
        const isDelete = window.confirm('해당 게시물을 삭제하시겠습니까?');
        if (isDelete === true) {
            alert('삭제!');
            // api요청
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.boardTitle}>
                    <span>{title}</span>
                    <div className={styles.boardEditContainer}>
                        <div className={styles.editBtns}>
                            <Button
                                size="small"
                                text="수정"
                                onClick={boardEditHandler}
                            />
                        </div>
                        <div className={styles.deleteBtns}>
                            <Button
                                size="small"
                                text="삭제"
                                onClick={boardDeleteHandler}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div className={styles.nameDate}>
                    {writer} / {date.toLocaleDateString()}
                </div>


            </div>

            <div className={styles.flex}>
                <div className={styles.imageContainer}>
                    <button className={styles.imgBtn} onClick={prevImgHandler}>
                        <VscTriangleLeft />
                    </button>
                    <div className={styles.image}>
                        <img
                            className={styles.img}
                            src={imgList[imgCount].src}
                        />
                    </div>
                    <button className={styles.imgBtn} onClick={nextImgHandler}>
                        <VscTriangleRight />
                    </button>
                </div>
            </div>
            <br />
            <div className={styles.boardContent}>
                {
                        content.split('\n')
                            .map((line, idx) => (
                            <span key={idx}>
                                {line}
                                <br />
                            </span>
                        ))
                }
            </div>

            <div className={styles.heartContainer}>
                <Likes count={213} isBig={true} />
            </div>

            <ReplyInput />

            <div className={styles.replyListContainer}>
                <Reply />
                <Reply />
                <Reply />
            </div>
        </div>
    );
}
