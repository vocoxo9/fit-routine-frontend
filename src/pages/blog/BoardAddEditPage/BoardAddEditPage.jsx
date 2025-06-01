import { useState } from 'react';
import styles from './BoardAddEditPage.module.css';
import CategorySelect from 'components/blog/CategorySelect/CategorySelect';
import buttons from 'assets/styles/common/button.module.css';
import inputs from 'assets/styles/common/input.module.css';
import textareas from 'assets/styles/common/textarea.module.css';

/**
 * 게시물 추가 및 수정 페이지
 * 
 * @param {number} [boardId] 수정 페이지로써 사용될 경우 게시물 번호
 */
function BoardAddEditPage(
    boardId, //<Route path="/blog/board/addEdit/:boardId?" element={<AddEditPage />} />
) {
    /*
    const dummyData = {
        imgList : [
            {
                src: 'jae3.jpg',
            },
            {
                src: 'jae4.jpg',
            },
            {
                src: 'jae5.jpg',
            },
        ],
        title : '운동 인증을 하는 이유',
        content : '안녕하세요, 김일현입니다.' +
            '저는 소통과 협업을 중시하는 개발자로,' +
            '팀워크 속에서 성장하는 것을 즐깁니다.\n현재는 React, ' +
            'Node.js 기반의 웹 개발에 주력하고 있으며, 사용자 중심의 UI/UX ' +
            '설계에도 많은 관심을 가지고 있습니다. \n새로운 기술에 대한 호기심이' +
            ' 많아 꾸준히 학습하고, 문제 해결을 위해 논리적으로 사고하려 노력합니다.' +
            ' \n틈틈이 운동을 하며 건강도 챙기고, 다양한 사람들과의 교류를 통해 시야를 넓히고 있습니다.',
        boardId : 1,
    }; 
    */

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    const options = [
        { label: '근육 증진', value: 'muscle' },
        { label: '체중 감량', value: 'diet' },
        { label: '체력 증진', value: 'stamina' },
    ];

    const titleHandler = (e) => {
        setTitle(e.target.value);
    };

    const categoryHandler = (e) => {
        setCategory(e.target.value);
    };

    const contentHandler = (e) => {
        setContent(e.target.value);
    };

    return (
        <div className={styles.pageContainer}>
            <form action={'#'} enctype="multipart/form-data" method="">
                <div className={styles.formHeader}>
                    <input className={`${inputs.input} ${inputs.long} ${styles.title}`}
                        placeHolder="*제목을 입력하세요."
                        type="text"
                        value={title}
                        onChange={titleHandler}
                    />
                    <CategorySelect
                        options={options}
                        value={category}
                        onChange={categoryHandler}
                    />
                </div>
                <div className={styles.attachFile}>
                    <input
                        type="file"
                        className={styles.fileInputBtn}
                        id="fileInput"
                    />
                    <label htmlFor="fileInput">
                        <button className={`${buttons.button} ${buttons.short}`} type="button">파일첨부</button>
                    </label>
                    <div className={styles.imgContainer}>
                        <table className={styles.table}>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>

                <textarea
                    className={`${styles.boardContent} ${textareas.textarea}`}
                    value={content}
                    onChange={contentHandler}></textarea>

                <div className={styles.btnContainer}>
                    <button className={`${buttons.button} ${buttons.short}`}>등록</button>
                    <button className={`${buttons.button} ${buttons.short}`}>취소</button>
                </div>
            </form>
        </div>
    );
}

export default BoardAddEditPage;