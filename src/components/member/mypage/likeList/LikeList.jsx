import { useEffect, useState } from 'react';
import Like from './Like';
import { getLikeList, deleteFollow } from 'utils/api/profileApi.js';
import styles from './LikeList.module.css';

function LikeList() {
    const [likeList, setLikeList] = useState([]);

    useEffect(() => {
        fetchLikeList();
    }, []);

    const fetchLikeList = async () => {
        const result = await getLikeList();
        const parsedResult = result.map((item) => {
            let gender;
            if (item.gender === 'M') gender = 'male';
            else if (item.gender === 'F') gender = 'female';
            else gender = null;

            return {
                ...item, 
                gender, 
            };
        });
        setLikeList(parsedResult);
    };

    const handleDelete = async (blogId) => {
        try {
            // await deleteFollow(blogId);
            // 삭제 후 상태 갱신
            setLikeList((prev) => prev.filter((item) => item.blogId !== blogId));
        } catch (error) {
            console.error('삭제 실패:', error);
        }
    };

    return (
        <>
            <div className={styles.subTitle}>관심 목록</div>
            <div className={styles.list}>
                {likeList.length > 0 ? (
                    likeList.map((like, index) => {
                        return (
                            <Like
                                key={index}
                                blogId={like.blogId}
                                nickName={like.nickname}
                                gender={like.gender}
                                grade={like.grade}
                                onDelete={handleDelete}
                            />
                        );
                    })
                ) : (
                    <p className={styles.noLikeList}>관심 등록이 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default LikeList;
