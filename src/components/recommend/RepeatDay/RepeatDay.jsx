import { useState } from 'react';

import styles from './RepeatDay.module.css';
import input from 'assets/styles/common/input.module.css';
import label from 'assets/styles/common/label.module.css';
import error from 'assets/styles/common/error.module.css';
import form from 'assets/styles//common/form.module.css';
import button from 'assets/styles/common/button.module.css';
import { calcTotalPeriod } from 'utils/helpers/calculator';

const checkRepeatRequired = (repeat) => {
    const errors = {};

    if (!repeat) {
        errors.repeat = '반복일을 입력해주세요.';
    }

    return errors;
};

function ExerciseRepeatsDay({ goToNext, formData, setFormData }) {
    const [errors, setErrors] = useState({});

    const dayDiff = calcTotalPeriod(formData.startedAt, formData.endedAt);
    const dayRepeat = Array.from({ length: dayDiff }, (_, i) => i + 1);

    const handleChange = (event) => {
        const repeat = event.target.value;
        setFormData((prev) => ({
            ...prev,
            dayRepeat: repeat,
        }));
    };

    const handleSubmit = () => {
        const validationResult = checkRepeatRequired(formData.dayRepeat);
        setErrors(validationResult);

        if (Object.keys(validationResult).length > 0) {
            return;
        }

        goToNext();
    };

    return (
        <form className={`${form.form} ${styles.form}`}>
            <h1 className={styles.title}>반복일</h1>
            {dayRepeat.slice(0, 7).map((day, index) => (
                <label
                    className={`${label.label} ${styles.container}`}
                    key={`${day}_${index}`}>
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
                type="button"
                className={`${button.button} ${button.long} ${styles.button}`}
                onClick={handleSubmit}>
                다음
            </button>
        </form>
    );
}
export default ExerciseRepeatsDay;
