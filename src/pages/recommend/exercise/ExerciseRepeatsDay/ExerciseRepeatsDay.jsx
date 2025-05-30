import { useState } from 'react';

import styles from 'pages/recommend/exercise/ExerciseRepeatsDay/ExerciseRepeatsDay.module.css';
import input from 'assets/styles/common/input.module.css';
import error from 'assets/styles/common/error.module.css';
import form from 'assets/styles//common/form.module.css';
import button from 'assets/styles/common/button.module.css';

const checkRepeatRequired = (repeat) => {
    const errors = {};

    if (!repeat) {
        errors.repeat = '반복일을 입력해주세요.';
    }

    return errors;
};

function ExerciseRepeatsDay() {
    const [repeat, setRepeat] = useState('');
    const [errors, setErrors] = useState({});

    const repeatDay = [1, 2, 3, 4, 5, 6, 7];

    const handleChange = (event) => {
        setRepeat(event.target.value);
    };

    const handleSubmit = () => {
        const validationResult = checkRepeatRequired(repeat);
        setErrors(validationResult);

        if (Object.keys(validationResult).length > 0) {
            return;
        }

        // 다음 페이지 이동 로직 추가
    };

    return (
        <div className={`${form.form} ${styles.form}`}>
            <h1 className={styles.title}>반복일</h1>
            {repeatDay.map((day, index) => (
                <label key={`${day}_${index}`} className={styles.container}>
                    <span className={styles.dayNo}>{day}일 반복</span>
                    <input
                        type="radio"
                        className={`${input.common} ${styles.radio}`}
                        id={day}
                        name="selectRepeats"
                        value={day}
                        onChange={handleChange}
                    />
                </label>
            ))}
            {errors.repeat && <p className={error.error}>{errors.repeat}</p>}

            <button
                className={`${button.button} ${button.long} ${styles.button}`}
                onClick={handleSubmit}>
                다음
            </button>
        </div>
    );
}
export default ExerciseRepeatsDay;
