import styles from 'pages/exercise/selectRepeatsDay/ExerciseRepeatsDay.module.css';

export default function ExerciseRepeatsDay() {

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <div className={styles.formTitle}>
                    <p>반복일</p>
                </div>
                <div className={styles.inputForm}>
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
            </div>
        </div>
    );

};