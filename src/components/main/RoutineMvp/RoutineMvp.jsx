import BarChart from 'components/common/BarChart/BarChart';
import styles from './RoutineMvp.module.css';

function RoutineMvp() {
    return (
        <>
            <div className={styles.title}>
                <div>이달의 루틴 MVP</div>
                <div className={styles.myRank}>
                    나의 순위 : <u>165등</u>
                </div>
            </div>
            <div className={styles.rank}>
                <BarChart />
            </div>
        </>
    );
}

export default RoutineMvp;
