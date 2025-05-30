import { useState } from 'react';

import styles from './ReSign.module.css';
import ReSignInfo from 'components/common/Info/ResignInfo';

function ReSign() {
    const [info, setInfo] = useState({
        email: 'squatqueen@gymfit.com',
        nickName: '스쿼트요정',
    });

    return (
        <>
            <div className={styles.subTitle}>회원 탈퇴</div>
            <div className={styles.table}>
                <ReSignInfo text="아이디" info={info.email} />
                <ReSignInfo text="닉네임" info={info.nickName} />
            </div>
            <div className={styles.reSignReason}>
                <div className={styles.reasontitle}>
                    Fit-Routine을 탈퇴하는 이유는 무엇인가요?
                </div>
                <div className={styles.reasonSubTitle}>
                    회원님께서 Fit-Routine을 탈퇴하는 사유를 알려주시면 보다
                    좋은 서비스 제공을 위해 노력 하겠습니다.
                </div>
                <div className={styles.reasonInput}>
                    <div className={styles.checkBox}>
                        <input 
                            type="checkbox"
                            id="badService"
                            name="reSignReason"
                            value="badService"
                            label="서비스 불만족"
                        />
                        <input 
                            type="checkbox"
                            id="personalInfo"
                            name="reSignReason"
                            value="personalInfo"
                            label="개인정보 보호 우려"
                        />
                        <input 
                            type="checkbox"
                            id="downUseFrequency"
                            name="reSignReason"
                            value="downUseFrequency"
                            label="사용 빈도 감소"
                        />
                        <input 
                            type="checkbox"
                            id="lack of contents"
                            name="reSignReason"
                            value="lack of contents"
                            label="콘텐츠 내용 부족"
                        />
                        <input 
                            type="checkbox"
                            id="other"
                            name="reSignReason"
                            value="other"
                            label="기타"
                        />
                    </div>
                    <div className={styles.textArea}>
                        <textarea name="reSignReason" id="reason" text="" />
                    </div>
                </div>
            </div>
            <div className={styles.btnArea}>
                <div className={styles.btns}>
                    <button size="small" text="탈퇴 확인" />
                    <button size="small" text="탈퇴 취소" />
                </div>
            </div>
        </>
    );
}

export default ReSign;
