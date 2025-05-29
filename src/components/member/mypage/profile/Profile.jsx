import { BsChevronDoubleRight } from 'react-icons/bs';

import Button from 'components/common/Button/Button';

import styles from './Profile.module.css';
import ProFileInfo from 'components/common/Info/ProfileInfo';

function Profile() {
    return (
        <>
            <div className={styles.subTitle}>내 프로필</div>
            <div className={styles.table}>
                <ProFileInfo kind="email" text="이메일" info="example@kh.com" />
                <ProFileInfo
                    kind="nickName"
                    text="닉네임"
                    info="다이어트는 내일부터"
                />
                <ProFileInfo kind="birth" text="생년월일" info="2006.06.18" />
                <ProFileInfo kind="phone" text="휴대폰" info="010-1234-5678" />
                <ProFileInfo kind="gender" text="성별" info="남" />
                <ProFileInfo kind="height" text="신장" info="174cm" />
                <ProFileInfo kind="weight" text="체중" info="70kg" />
            </div>
            <div className={styles.buttons}>
                <div className={styles.editBtn}>
                    <button>수정</button>
                </div>
                <div className={styles.reSignBtn}>
                    회원 탈퇴
                    <div>
                        <BsChevronDoubleRight />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
