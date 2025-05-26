import styles from './TextArea.module.css';

/**
 * textarea 공통 컴포넌트 (회원탈퇴,)
 *
 * @param {string} name textArea의 name값
 * @param {string} id textArea의 Id값
 * @param {string} kind resign-회원탈퇴, reply-댓글입력칸, boardAdd-게시물추가페이지 내용칸
 * @param {string} placeholder textArea의 placeholder내용
 */
function TextArea(
    {
        name,
        id,
        kind = 'resign',
        placeholder = '사유를 입력해주세요',
    },
) {
    return (
        <div className={styles.textArea}>
            <textarea
                className={`${styles[kind]}`}
                name={name}
                id={id}
                placeholder={placeholder} />
        </div>
    );
}

export default TextArea;