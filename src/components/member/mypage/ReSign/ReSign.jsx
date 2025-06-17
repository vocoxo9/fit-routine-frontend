import { useEffect, useState } from 'react';

import styles from './ReSign.module.css';
import label from 'assets/styles/common/label.module.css';
import input from 'assets/styles/common/input.module.css';
import textarea from 'assets/styles/common/textarea.module.css';
import button from 'assets/styles/common/button.module.css';
import ReSignInfo from 'components/common/Info/ResignInfo';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile, submitReason, resignUser } from 'utils/api/profileApi.js';

function ReSign() {
    const [info, setInfo] = useState({
        email: '',
        nickname: '',
    });

    const [selectedReason, setSelectedReason] = useState([]);

    const [inputReason, setInputReason] = useState(null);

    useEffect(() => {
        const fetchResignUser = async () => {
            const result = await getUserProfile();
            setInfo(result);
        }
        fetchResignUser();
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            // 체크된 항목 추가
            setSelectedReason(prev => [...prev, value]);
        } else {
            // 체크 해제된 항목 제거
            setSelectedReason(prev => prev.filter(item => item !== value));
        }
    };

    const handleSubmit = async () => {
        const reasonResponse = await submitReason(selectedReason, inputReason);
        const resignResponse = await resignUser();
        if (reasonResponse && resignResponse) {
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/"; // 메인으로 리다이렉트
    };

    return (
        <>
            <div className={styles.subTitle}>회원 탈퇴</div>
            <div className={styles.table}>
                <ReSignInfo text="아이디" info={info.email} />
                <ReSignInfo text="닉네임" info={info.nickname} />
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
                        <div className={styles.checkInput}>
                            <input
                                className={`${input.input}`}
                                type="checkbox"
                                id="badService"
                                name="reSignReason"
                                value="서비스 불만족"
                                onChange={handleCheckboxChange}
                            />
                            <label className={label.label} for='badService'>서비스 불만족</label>
                        </div>
                        <div className={styles.checkInput}>
                            <input
                                className={`${input.input}`}
                                type="checkbox"
                                id="personalInfo"
                                name="reSignReason"
                                value="개인정보 보호 우려"
                                onChange={handleCheckboxChange}
                            />
                            <label className={label.label} for='personalInfo'>개인정보 보호 우려</label>
                        </div>
                        <div className={styles.checkInput}>
                            <input
                                className={`${input.input}`}
                                type="checkbox"
                                id="downUseFrequency"
                                name="reSignReason"
                                value="사용 빈도 감소"
                                onChange={handleCheckboxChange}
                            />
                            <label className={label.label} for='downUseFrequency'>사용 빈도 감소</label>
                        </div>
                        <div className={styles.checkInput}>
                            <input
                                className={`${input.input}`}
                                type="checkbox"
                                id="lack of contents"
                                name="reSignReason"
                                value="콘텐츠 내용 부족"
                                onChange={handleCheckboxChange}
                            />
                            <label className={label.label} for='lack of contents'>콘텐츠 내용 부족</label>
                        </div>
                        <div className={styles.checkInput}>
                            <input
                                className={`${input.input}`}
                                type="checkbox"
                                id="other"
                                name="reSignReason"
                                value="기타"
                                onChange={handleCheckboxChange}
                            />
                            <label className={label.label} for='other'>기타</label>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <textarea 
                            className={`${textarea.textarea} ${styles.textArea}`} 
                            name="reSignReason" 
                            id="reason" 
                            value={inputReason}
                            onChange={(event) => setInputReason(event.target.value)} 
                        />
                    </div>
                </div>
            </div>
            <div className={styles.btnArea}>
                <div className={styles.btns}>
                    <Link to='/'>
                        <button 
                            className={`${button.button} ${styles.smallBtn}`}
                            onClick={handleSubmit}
                        >
                            회원 탈퇴
                        </button>
                    </Link>
                    <Link to='/mypage'>
                        <button 
                            className={`${button.button} ${styles.smallBtn}`}>
                            탈퇴 취소
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ReSign;
