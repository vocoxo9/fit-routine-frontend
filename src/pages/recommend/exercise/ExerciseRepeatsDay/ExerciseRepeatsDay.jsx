import { useEffect, useState } from 'react';

import FormBox from 'components/common/FormContainer/FormContainer';
import FormTitle from 'components/common/FormTitle/FormTitle';
import Button from 'components/common/Button/Button';
import RadioGroup from 'components/common/RadioGroup/RadioGroup';
import Radio from 'components/common/Radio/Radio';

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
            alert('반복일을 설정해 주세요');
            return;
        }

        // 다음 페이지 이동 로직 추가
    };

    return (
        <FormBox>
            <FormTitle text="반복일" />
            <div className={styles.inputForm}>
                <RadioGroup>
                    {repeatDay.map((day, index) => (
                        <Radio
                            key={`${day}_${index}`}
                            id={`day${day}`}
                            name="repeat"
                            value={day}
                            label={`${day}일 반복`}
                            onChange={handleChange}
                            style="long"
                        />
                    ))}
                </RadioGroup>
                {error.repeat && <p className={styles.error}>{error.repeat}</p>}
            </div>
            <Button size="long" text="다음" onClick={handleSubmit} />
        </FormBox>
    );
}
export default ExerciseRepeatsDay;
