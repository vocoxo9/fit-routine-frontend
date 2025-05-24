import styles from './MessageForm.module.css';

/**
 * @data
 * @returns 
 */
const MessageForm = (
    {
        data
    }
) => {

    return (
        <>
            <div className={styles.message}>
                <p>선택하신 운동의 총 소모 칼로리는 <span>{data.kcal}</span>kcal입니다.</p>
                <p>{data.kcal}/{data.burnKcal}</p>
            </div>
        </>
    );
};

export default MessageForm;