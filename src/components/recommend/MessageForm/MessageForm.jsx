import styles from './MessageForm.module.css';

/**
 * @data 사용자에게 추천되는 리스트
 * @returns {JSX.Element} 소모칼로리 미달 시 메세지 컴포넌트
 */
const MessageForm = ({ data }) => {
    return (
        <>
            <div className={styles.container}>
                <p>
                    선택하신 운동의 총 소모 칼로리는
                    <span className={styles.kcal}>
                        {data.kcal}
                        kcal
                    </span>
                    입니다.
                </p>
                <p className={styles.burnKcal}>
                    {data.kcal}/{data.burnKcal}
                </p>
            </div>
        </>
    );
};

export default MessageForm;
