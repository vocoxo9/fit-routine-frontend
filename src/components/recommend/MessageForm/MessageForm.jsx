import styles from './MessageForm.module.css';

/**
 * @data 사용자에게 추천되는 리스트
 * @returns {JSX.Element} 소모칼로리 미달 시 메세지 컴포넌트
 */
const MessageForm = (
    {
        data
    }
) => {

    return (
        <>
            <div className={styles.message}>
                <p className={styles.kcal}>
                    선택하신 운동의 총 소모 칼로리는 <span>{data.kcal}</span>kcal입니다.
                </p>
                <p className={styles.burnKcal}>
                    {data.kcal}/{data.burnKcal}
                </p>
            </div>
        </>
    );
};

export default MessageForm;
