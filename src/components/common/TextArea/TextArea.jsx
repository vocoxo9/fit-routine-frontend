import styles from './TextArea.module.css';

function TextArea ({ name, id }) {
    return (
        <div className={styles.textArea}>
            <textarea 
                className={styles.textarea} 
                name={name} 
                id={id} 
                placeholder='사유를 입력해주세요.' />
        </div>
    );
}

export default TextArea;