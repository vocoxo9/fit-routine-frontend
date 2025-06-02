import { useState } from 'react';
import styles from './MyPageForm.module.css';
import Profile from './profile/Profile';
import LikeList from './likeList/LikeList';
import InfoEdit from './InfoEdit';

function MyPageForm() {
    const [activeTab, setActiveTab] = useState('profile'); // 기본값: profile

    const [isEdit, setIsEdit] = useState(false);

    const handleClickProfileTab = () => {
        if (!isEdit) {
            setActiveTab('profile');
        }
    };

    const handleClickLikeListTab = () => {
        if (!isEdit) {
            setActiveTab('likeList');
        }
    };

    return (
        <>
            <div>
                <div className={styles.menu}>
                    <div
                        className={`${styles.profile} 
                    ${activeTab === 'profile' ? styles.active : ''}`}
                        onClick={handleClickProfileTab}>
                        회원 정보
                    </div>
                    <div className={styles.between}></div>
                    <div
                        className={`${styles.likeList} 
                        ${activeTab === 'likeList' ? styles.active : ''}`}
                        onClick={handleClickLikeListTab}>
                        관심 목록
                    </div>
                </div>
                <div className={styles.content}>
                    {/* {activeTab === 'profile' ? <Profile /> : <LikeList />}
                    <InfoEdit /> */}
                    {
                        isEdit === false ? (activeTab ==='profile' ? <Profile setIsEdit={setIsEdit} /> : <LikeList />) : <InfoEdit />
                    }
                </div>
            </div>
        </>
    );
}

export default MyPageForm;
