import Button from 'components/common/button/Button';
import CheckBox from 'components/common/checkBox/CheckBox';
import Input from 'components/common/input/Input';
import FormTitle from 'components/recommend/title/FormTitle';
import styles from 'pages/exercise/suggestRoutine/SuggestRoutine.module.css';

export default function SuggestRoutine() {

    return (
        <div className={styles.container}>
            <FormTitle text="FIT-ROUTINE" />

            <div className={styles.suggestForm}>
                <div className={styles.repeatsDay}>
                    <span>1일차</span>
                    <span>435kcal</span>
                </div>
                <div className={styles.formLeft}>
                    <CheckBox id="1" label="크런치" />
                    <CheckBox id="2" label="런지" />
                    <CheckBox id="3" label="플랭크" />
                    <CheckBox id="4" label="사이드플랭ㅇㅇ크" />
                    <CheckBox id="5" label="벤치프레스" />
                    <CheckBox id="6" label="크런ㅇㅇㅇㅇ치" />
                    <CheckBox id="7" label="운동1" />
                    <CheckBox id="11" label="운동2" />
                    <CheckBox id="12" label="운동3" />
                    <CheckBox id="13" label="ㅇㄴ동4" />
                    <CheckBox id="14" label="운동5" />
                    <CheckBox id="15" label="운동6" />
                </div>
                <div className={styles.formRight}>
                    <button className={styles.plusButton}>+</button>
                </div>
            </div>
            <div className={styles.suggestForm}>
                <CheckBox label="크런치" />
            </div>
            <div className={styles.suggestForm}>
                <CheckBox label="크런치" />
            </div>
            <div className={styles.suggestForm}>
                <CheckBox label="크런치" />
            </div>

            <Button size="bold" text="루틴 등록"/>
        </div>
    );

};