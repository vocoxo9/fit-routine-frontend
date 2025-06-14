import BarChart from 'components/common/BarChart/BarChart';
import styles from './RoutineMvp.module.css';
import { useEffect, useState } from 'react';
import { getMyRank, getMvpRank } from 'utils/api/mainApi.js';
import { isLoggedIn } from 'utils/helpers/token.js';

function RoutineMvp() {
    const [myRank, setMyRank] = useState(null);

    const [mvpRank, setMvpRank] = useState([]);

    const [errorMsg, setErrorMsg] = useState(
        {
            myRankError: '', mvpRankError: '',
        }
    );

    const token = isLoggedIn();

    useEffect(() => {
        const fetchRoutineMvp = async () => {
            try {
                const result = await getMvpRank();
                setMvpRank(result);
            } catch (error) {
                setErrorMsg(prev => ({ ...prev, mvpRankError: "통계할 Routine 데이터가 부족합니다." }));
            }

            if (token) {
                try {
                    const result = await getMyRank();
                    setMyRank(`${result.rank}등 (${result.count}건)`);
                } catch (error) {
                    setErrorMsg(prev => ({ ...prev, myRankError: "등록된 루틴이 없습니다." }));
                }
            }
        }
        fetchRoutineMvp();
    },[token]);

    return (
        <>
            <div className={styles.title}>
                <div>이달의 루틴 MVP</div>
                <div className={styles.myRank}>
                    {token ?
                        myRank ? <p>나의 순위 : {myRank}</p> : <p>{errorMsg.myRankError}</p> :
                        !errorMsg.mvpRankError && (<p>나의 순위는 로그인 후 확인이 가능합니다.</p>)
                    }
                </div>
            </div>
            <div className={styles.rank}>
            {mvpRank && mvpRank.length !== 0 ?
                <BarChart
                    mvpRank={mvpRank} 
                /> :
                <p className={styles.error}>{errorMsg.mvpRankError}</p>
            }
            </div>
        </>
    );
}

export default RoutineMvp;
