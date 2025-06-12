import BarChart from 'components/common/BarChart/BarChart';
import styles from './RoutineMvp.module.css';
import { useEffect, useState } from 'react';
import { getMyRank, getMvpRank } from 'utils/api/mainApi.js';

function RoutineMvp() {
    const [myRank, setMyRank] = useState(0);

    const [mvpRank, setMvpRank] = useState();

    useEffect(() => {
        const fetchMyRank = async () => {
            const result = await getMyRank();
            setMyRank(result);
        }
        fetchMyRank();

        const fetchMvpData = async () => {
            const result = await getMvpRank();
            setMvpRank(result);
        }
        fetchMvpData();
    },[]);

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
