import Input from 'components/common/input/Input';
import styles from './Calculator.module.css';
import Button from 'components/common/button/Button';
import { Doughnut } from 'react-chartjs-2';
import DoughnutChart from 'components/common/doughnutChart/DoughnutChart';
import { FcCalculator } from "react-icons/fc";


function Calculator() {
    return (
        <div className={styles.border}>
            <div className={styles.title}>
                <div style={{ fontSize: '4rem' }}>
                    <FcCalculator />
                </div>
                <div>
                    일일 권장 섭취량 계산기
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.leftArea}>
                    <div>
                        <div className={styles.inputArea}>
                            <labe className={styles.label} htmlFor="age">나이</labe>
                            <Input size='short' type='number' id='age' name='age' />
                        </div>
                        <div className={styles.inputArea}>
                            <label className={styles.label} htmlFor="gender">성별</label>
                            <Input size='short' type='number' id='gender' name='gender' />
                        </div>
                        <div className={styles.inputArea}>
                            <label className={styles.label} htmlFor="gender">신장</label>
                            <Input size='short' type='number' id='height' name='height' />
                            <label className={styles.label} htmlFor="gender">체중</label>
                            <Input size='short' type='number' id='weight' name='weight' />
                        </div>
                    </div>
                    <div className={styles.buttonArea}>
                        <Button size='short' text='확인' />
                    </div>
                </div>
                <div className={styles.rightArea}>
                    <div className={styles.resultArea}>
                        <div className={styles.doughnutArea}>
                            <DoughnutChart labels={["탄수화물", "단백질", "지방"]} data={["100", "50", "20"]} />
                        </div>
                        <div className={styles.kcalArea}>
                            <p className={styles.p}>탄수화물 : <u>12</u> kcal</p>
                            <p className={styles.p}>단백질 : <u>12</u> kcal</p>
                            <p className={styles.p}>지방 : <u>12</u> kcal</p>
                        </div>
                    </div>
                    <div className={styles.buttonArea}>
                        <Button size='bold' text='루틴 추천 받으러 가기' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;