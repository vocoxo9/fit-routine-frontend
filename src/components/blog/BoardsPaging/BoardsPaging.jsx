import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardPreview from '../BoardPreview/BoardPreview';
import styles from './BoardsPaging.module.css';

/**
 * 게시물 페이징 컴포넌트 - 전체 게시판 페이지, 블로그 페이지 사용
 *
 * @param {Object} tempboardList 임시데이터 - 추후 삭제 예정
 * @param {string} nickname @nullable - 블로그 페이지일 경우 닉네임 데이터가 들어오면 그 유저의 게시물만 가져옴
 * @param {string} order 게시물 나열 순서 - latest:최신순(기본값) / like:좋아요순
 * @param {string} category 게시물 카테고리 - free:모두(기본값) / muscle:근육증진 / diet:체중감량 / stamina:체력증진
 */
export default function BoardsPaging({
    tempboardList,
    nickname,
    order = 'latest',
    category = 'free',
}) {
    const [boardList, setBoardList] = useState(tempboardList || []); // 게시물 목록
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

    // 페이지, 순서, 카테고리 변경 시 게시물 요청
    useEffect(() => {
        if (nickname) {
            fetchBoardsByNickname(currentPage);
        } else {
            fetchBoardsByOrderCategory(currentPage);
        }
    }, [currentPage, nickname, order, category]);

    // 특정 유저의 게시물 api요청 후 상태 저장
    const fetchBoardsByNickname = async (pageNum) => {
        if (!nickname) return;
        // const res = await axios.get('/api/boards/user');
        // setBoardList(res.data.boardList);   // 게시물 목록
        // setTotalPages(res.data.totalPages); // 전체 페이지 수
    };

    // order,category값으로 전체 게시물 api요청 후 상태 저장
    const fetchBoardsByOrderCategory = async (pageNum) => {
        // const res = await axios.get(); 추후 게시물6개 데이터 요청예정
        setBoardList(boardList); // 서버가 보내준 게시물 6개
        setTotalPages(5); // 서버가 보내준 전체 페이지 수
    };

    const changeCurrentPageNum = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
        }
    };

    // 3개씩 잘라서 테이블 행(row) 구성
    const rows = [];
    for (let i = 0; i < boardList.length; i += 3) {
        rows.push(boardList.slice(i, i + 3));
    }

    return (
        <>
            <table className={styles.table}>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((item) => (
                                <td key={item.boardId} className={styles.td}>
                                    <BoardPreview
                                        imgSrc={item.src}
                                        boardWriter={item.boardWriter}
                                        boardTitle={item.boardTitle}
                                        boardId={item.boardId}
                                    />
                                </td>
                            ))}
                            {row.length < 3 &&
                                Array.from({ length: 3 - row.length }).map(
                                    (_, i) => (
                                        <td
                                            key={`empty-${i}`}
                                            className={styles.td}></td>
                                    ),
                                )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav className={styles.nav}>
                <ul className={styles.ul} id="pagination-area">
                    <li>
                        <a
                            href="#"
                            onClick={() =>
                                changeCurrentPageNum(currentPage - 1)
                            }>
                            이전
                        </a>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i}>
                            <a
                                href="#"
                                onClick={() => changeCurrentPageNum(i + 1)}
                                className={
                                    currentPage === i + 1
                                        ? styles.current
                                        : styles.others
                                }>
                                {i + 1}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#"
                            onClick={() =>
                                changeCurrentPageNum(currentPage + 1)
                            }>
                            다음
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
