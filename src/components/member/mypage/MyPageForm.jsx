import { useState } from 'react';
import styles from './MyPageForm.module.css';
import Profile from './Profile';
import InfoEdit from './InfoEdit';

function MyPageForm() {
    const [activeTab, setActiveTab] = useState('profile'); // 기본값: profile

    return (
        <>
            <div>
                <div className={styles.menu}>
                    <div className={`${styles.profile} 
                    ${activeTab === 'profile' ? styles.active : ''}`}
                        onClick={() => setActiveTab('profile')}>
                        회원 정보
                    </div>
                    <div className={styles.between}>

                    </div>
                    <div className={`${styles.likeList} 
                        ${activeTab === 'likeList' ? styles.active : ''}`}
                        onClick={() => setActiveTab('likeList')}>
                        관심 목록
                    </div>
                </div>
                <div className={styles.content}>
                    {activeTab === 'profile' ? <Profile /> : <InfoEdit />}
                </div>
            </div>
        </>
    );
}

export default MyPageForm;