import Button from 'components/common/button/Button';
import Radio from 'components/common/radio/Radio';
import RadioGroup from 'components/common/radioGroup/RadioGroup';
import FormBox from 'components/recommend/form/FormContainer';
import FormTitle from 'components/recommend/title/FormTitle';

import styles from 'pages/exercise/selectRepeatsDay/ExerciseRepeatsDay.module.css';

import { useState } from 'react';

export default function ExerciseRepeatsDay() {

    const [repeats, setRepeats] = useState('');
    const repeatOptions = [1, 2, 3, 4, 5, 6, 7];

    return (
        <FormBox>
            <FormTitle text="반복일" />
            <div className={styles.inputForm}>
                <RadioGroup >
                    {repeatOptions.map((day) => (
                        <Radio
                            key={`${day}+_index`}
                            id={`day${day}`}
                            name="selectRepeats"
                            value={day}
                            label={`${day}일 반복`}
                            onChnage={(e) => setRepeats(e.target.value)} />
                    ))}
                </RadioGroup>
            </div>
            <Button size="long" text="다음"></Button>
        </FormBox>
    );

};