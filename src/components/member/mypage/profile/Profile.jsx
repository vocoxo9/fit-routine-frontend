import { BsChevronDoubleRight } from 'react-icons/bs';

import button from 'assets/styles/common/button.module.css';

import styles from './Profile.module.css';
import ProFileInfo from 'components/common/Info/ProfileInfo';
import { useState } from 'react';
import PasswordConfirmModal from 'components/member/mypage/ReSign/PasswordCofirmModal';

function Profile({infoData, setIsEdit}) {
    // 모달창을 띄우는 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={styles.subTitle}>내 프로필</div>
            <div className={styles.table}>
                <ProFileInfo 
                    kind="email" 
                    text="이메일" 
                    info={infoData.email} 
                />
                <ProFileInfo
                    kind="nickName"
                    text="닉네임"
                    info={infoData.nickname}
                />
                <ProFileInfo 
                    kind="birth" 
                    text="생년월일" 
                    info={infoData.birthAt}
                />
                <ProFileInfo 
                    kind="phone" 
                    text="휴대폰" 
                    info={infoData.phone}
                />
                <ProFileInfo 
                    kind="gender" 
                    text="성별" 
                    info={infoData.gender}
                />
                <ProFileInfo 
                    kind="height" 
                    text="신장" 
                    info={infoData.height}
                />
                <ProFileInfo 
                    kind="weight" 
                    text="체중" 
                    info={infoData.weight}
                />
            </div>
            <div className={styles.buttons}>
                <div className={styles.editBtn}>
                    <button
                        className={`${button.button} ${button.short}`}
                        onClick={() => setIsEdit(true)}
                        >
                        수정
                    </button>
                </div>
                <div 
                    className={styles.reSignBtn} 
                    onClick={() => setIsModalOpen(true)}
                >
                    회원 탈퇴
                    <div>
                        <BsChevronDoubleRight />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <>
                    <div className={styles.overlay} onClick={() => setIsModalOpen(false)}></div>
                    <PasswordConfirmModal 
                        email={infoData.email}
                    />
                </>
            )}
        </>
    );
}

export default Profile;
