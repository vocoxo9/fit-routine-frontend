import { useState } from 'react';

import styles from 'pages/recommend/exercise/ExerciseRepeatsDay/ExerciseRepeatsDay.module.css';

const checkRepeatRequired = (repeat) => {
    const error = {};

    if (!repeat) {
        error.repeat = '반복일을 입력해주세요.';
    }

    return error;
};

function ExerciseRepeatsDay() {
    const [repeat, setRepeat] = useState('');
    const [error, setError] = useState({});

    const repeatDay = [1, 2, 3, 4, 5, 6, 7];

    const handleChange = (event) => {
        setRepeat(event.target.value);
    };

    const handleSubmit = () => {
        const validationResult = checkRepeatRequired(repeat);
        setError(validationResult);

        if (Object.keys(validationResult).length > 0) {
            return;
        }

        // 다음 페이지 이동 로직 추가
    };

    return (
        <>
            <h1>반복일</h1>
            <div className={styles.inputForm}>
                    {repeatDay.map((day, index) => (
                        <radio
                            key={`${day}_${index}`}
                            id={`day${day}`}
                            name="repeat"
                            value={day}
                            label={`${day}일 반복`}
                            onChange={handleChange}
                        />
                    ))}
                {error.repeat && <p className={styles.error}>{error.repeat}</p>}
            </div>
            <button onClick={handleSubmit}>다음</button>
        </>
    );
}
export default ExerciseRepeatsDay;
