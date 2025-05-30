import { useState } from 'react';
import styles from './BoardAddEditPage.module.css';
import CategorySelect from 'components/blog/CategorySelect/CategorySelect';
import buttons from 'assets/styles/common/button.module.css';
import inputs from 'assets/styles/common/input.module.css';
import textareas from 'assets/styles/common/textarea.module.css';

/**
 * 게시물 추가 및 수정 페이지
 */
function BoardAddEditPage() {
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
                                <td>
                                    <img src="/jae3.jpg" />
                                </td>
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