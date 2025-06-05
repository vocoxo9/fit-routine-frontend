import { useEffect, useState } from 'react';
import styles from './MyPageForm.module.css';
import Profile from './profile/Profile';
import LikeList from './likeList/LikeList';
import InfoEdit from './InfoEdit';
import { getUserProfile } from 'utils/api/profileApi.js';

function MyPageForm() {
    const [activeTab, setActiveTab] = useState('profile'); // 기본값: profile

    const [isEdit, setIsEdit] = useState(false);

    const [infoData, setInfoData] = useState(
        {
            email:'', 
            nickname:'', 
            birthAt:'', 
            phone:'', 
            gender:'', 
            height:'', 
            weight:'', 
        }
    );

    useEffect( () => {
        const fetchProfile = async () => {
            // 회원의 프로필 정보를 가져오는 api 함수
            const result = await getUserProfile();
            if (result.gender === 'F') {
                result.gender = '여자';
            } else if (result.gender === 'M') {
                result.gender = '남자자';
            } else {
                // 정보가 잘못 저장되어 있으므로 따로 처리해줘야 함: TODO
            }
            setInfoData(result);
        };

        fetchProfile();
    }, [isEdit]);

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
                        isEdit === false ? (activeTab ==='profile' ? <Profile infoData={infoData} setIsEdit={setIsEdit} /> : <LikeList />) : <InfoEdit infoData={infoData} />
                    }
                </div>
            </div>
        </>
    );
}

export default MyPageForm;
