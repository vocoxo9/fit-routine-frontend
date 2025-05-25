import Input from "components/common/Input/Input";
import { useState } from "react";
import styles from './BoardAddEditPage.module.css';
import CategorySelect from "components/blog/CategorySelect/CategorySelect";
import Button from "components/common/Button/Button";

/**
 * 게시물 추가 및 수정 페이지
 */
export default function BoardAddEditPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    const options = [
        {label:'근육 증진', value:'muscle'},
        {label:'체중 감량', value:'diet'},
        {label:'체력 증진', value:'stamina'}
    ]

    const titleHandler = (e) => {
        setTitle(e.target.value);
    }

    const categoryHandler = (e) => {
        setCategory(e.target.value);
    }

    const contentHandler = (e) => {
        setContent(e.target.value);
    }

    return (
        <div className={styles.pageContainer}>
            <form action={'#'} enctype="multipart/form-data" method="">
                <div className={styles.formHeader}>
                    <Input size="title" placeHolder="*제목을 입력하세요." type="text" value={title} onChange={titleHandler}/>
                    <CategorySelect options={options} value={category} onChange={categoryHandler}/>
                </div>
                <div className={styles.attachFile}>
                    <input type="file" text="파일첨부" className={styles.fileInputBtn} id="fileInput"/>
                    <label htmlFor="fileInput"><Button size="medium" text="파일첨부" type="button"/></label>
                    <div className={styles.imgContainer}>
                        <table className={styles.table}>
                            <tr>
                                <td><img src="/jae3.jpg"/></td>
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

                <textarea className={styles.boardContent} value={content} onChange={contentHandler}>

                </textarea>
                
                <div className={styles.btnContainer}>
                    <Button size="medium" text="등록"/>
                    <Button size="medium" text="취소"/>
                </div>
            </form>
        </div>
    )

}