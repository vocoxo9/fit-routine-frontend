import { VscEdit } from 'react-icons/vsc';
import styles from './IntroduceEdit.module.css';
import buttons from 'assets/styles/common/button.module.css';
import { useEffect, useState } from 'react';
import textarea from 'assets/styles/common/textarea.module.css';

/**
 * 본인 블로그일 경우 소개글 수정버튼 클릭시 나타나는 수정 컴포넌트
 * 
 * @param {string} introduce 블로그 기존 소개글 
 * @param {function} onClick 소개글 작성이 끝난후 저장하는 함수
 * @param {function} cancelClick 소개글 수정취소 눌렀을때 동작되는 함수
 */
function IntroduceEdit({introduce, onClick, cancelClick}) {

    const [intro, setIntro] = useState();

    useEffect(()=>{
        setIntro(introduce);
    },[introduce]);

    const handleEditClick = () => {
        onClick(intro);
    }

    return (
        <div className={styles.container}>
            <textarea className={`${textarea.textarea} ${styles.introduceText}`} 
            value={intro}
            onChange={event=>setIntro(event.target.value)}
            ></textarea>
            <div className={styles.buttonArea}>
                <button className={`${buttons.button} ${styles.editButton}`}
                    onClick={handleEditClick}
                >수정</button>
                <button className={`${buttons.button} ${styles.cancelButton}`}
                    onClick={cancelClick}
                >취소</button>
            </div>
        </div>
    )
}

export default IntroduceEdit;