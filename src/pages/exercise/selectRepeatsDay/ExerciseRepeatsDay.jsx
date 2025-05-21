import Radio from 'components/common/radio/Radio';
import RadioGroup from 'components/common/radioGroup/RadioGroup';
import FormBox from 'components/recommend/form/FormContainer';
import FormTitle from 'components/recommend/title/FormTitle';

import styles from 'pages/exercise/selectRepeatsDay/ExerciseRepeatsDay.module.css';

import { useState } from 'react';

export default function ExerciseRepeatsDay() {

    const [repeats, setRepeats] = useState('');

    return (
            <FormBox>
                <FormTitle text="반복일"/>
                <div className={styles.inputForm}>
                    {/* <RadioGroup >
                        <Radio 
                        id="day1"
                        name="selectRepeats"
                        value="1"
                        label="1일 반복"/>
                    </RadioGroup> */}

                    <div className={styles.radioForm}>
                        <label className={styles.label} htmlFor="day1">1일 반복</label>
                        <input className={styles.input} type="radio" name="selectRepeats" id="day1" />
                    </div>

                    <div className={styles.radioForm}>
                        <label className={styles.label} htmlFor="day2">2일 반복</label>
                        <input className={styles.input} type="radio" name="selectRepeats" id="day2" />
                    </div>

                    <div className={styles.radioForm}>
                        <label className={styles.label} htmlFor="day3">3일 반복</label>
                        <input className={styles.input} type="radio" name="selectRepeats" id="day3" />
                    </div>

                    <div className={styles.radioForm}>
                        <label className={styles.label} htmlFor="day4">4일 반복</label>
                        <input className={styles.input} type="radio" name="selectRepeats" id="day4" />
                    </div>

                    <div className={styles.radioForm}>
                        <label className={styles.label} htmlFor="day5">5일 반복</label>
                        <input className={styles.input} type="radio" name="selectRepeats" id="day5" />
                    </div>

                    <div className={styles.radioForm}>
                        <label className={styles.label} htmlFor="day6">6일 반복</label>
                        <input className={styles.input} type="radio" name="selectRepeats" id="day6" />
                    </div>

                    <div className={styles.radioForm}>
                        <label className={styles.label} htmlFor="day7">7일 반복</label>
                        <input className={styles.input} type="radio" name="selectRepeats" id="day7" />
                    </div>

                    <button className={styles.nextButton} >다음</button>
                </div>
            </FormBox>
    );

};