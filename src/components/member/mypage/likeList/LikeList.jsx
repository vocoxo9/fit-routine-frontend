import { useState } from 'react';
import Like from './Like';

import styles from './LikeList.module.css';

function LikeList() {
    const [likeList, setLikeList] = useState([
        { nickName: '스쿼트요정', gender: 'female', grade: 312 },
        { nickName: '벤치프레스왕', gender: 'male', grade: 478 },
        { nickName: '요가마스터', gender: 'female', grade: 215 },
        { nickName: '철봉달인', gender: 'male', grade: 389 },
        { nickName: '런닝매니아', gender: 'female', grade: 141 },
        { nickName: '근성장인', gender: 'male', grade: 500 }, // 최고점
        { nickName: '필라테스러버', gender: 'female', grade: 87 },
        { nickName: '복근제조기', gender: 'male', grade: 260 },
        { nickName: '바벨공주', gender: 'female', grade: 423 },
        { nickName: '데드리프트킹', gender: 'male', grade: 351 },
        { nickName: '케틀벨여신', gender: 'female', grade: 172 },
        { nickName: '팔굽혀달인', gender: 'male', grade: 58 },
        { nickName: '스트레칭요정', gender: 'female', grade: 230 },
        { nickName: '턱걸이장인', gender: 'male', grade: 315 },
        { nickName: '워밍업요정', gender: 'female', grade: 199 },
    ]);

    return (
        <>
            <div className={styles.subTitle}>관심 목록</div>
            <div className={styles.list}>
                {likeList.map((like, index) => {
                    return (
                        <Like
                            key={index}
                            nickName={like.nickName}
                            gender={like.gender}
                            grade={like.grade}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default LikeList;
