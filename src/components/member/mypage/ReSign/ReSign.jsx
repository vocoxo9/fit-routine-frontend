import { useState } from 'react';

import styles from './ReSign.module.css';
import ReSignInfo from 'components/common/info/ResignInfo';
import CheckBox from 'components/common/CheckBox/CheckBox';
import TextArea from 'components/common/TextArea/TextArea';
import Button from 'components/common/Button/Button';

function ReSign() {
    const [info, setInfo] = useState(
        { email: 'squatqueen@gymfit.com', nickName: '스쿼트요정' }
    );

    return (
        <>
            <div className={styles.subTitle}>
                회원 탈퇴
            </div>
            <div className={styles.table}>
                <ReSignInfo text='아이디' info={info.email} />
                <ReSignInfo text='닉네임' info={info.nickName} />
            </div>
            <div className={styles.reSignReason}>
                <div className={styles.reasontitle}>
                    Fit-Routine을 탈퇴하는 이유는 무엇인가요?
                </div>
                <div className={styles.reasonSubTitle}>
                    회원님께서 Fit-Routine을 탈퇴하는 사유를 알려주시면 보다 좋은 서비스 제공을 위해 노력 하겠습니다.
                </div>
                <div className={styles.reasonInput}>
                    <div className={styles.checkBox}>
                        <CheckBox id='badService'
                            name='reSignReason'
                            value='badService'
                            label='서비스 불만족' />
                        <CheckBox id='personalInfo'
                            name='reSignReason'
                            value='personalInfo'
                            label='개인정보 보호 우려' />
                        <CheckBox id='downUseFrequency'
                            name='reSignReason'
                            value='downUseFrequency'
                            label='사용 빈도 감소' />
                        <CheckBox id='lack of contents'
                            name='reSignReason'
                            value='lack of contents'
                            label='콘텐츠 내용 부족' />
                        <CheckBox id='other'
                            name='reSignReason'
                            value='other'
                            label='기타' />
                    </div>
                    <div className={styles.textArea}>
                        <TextArea name='reSignReason' id='reason' text='' />
                    </div>
                </div>
            </div>
            <div className={styles.btnArea}>
                <div className={styles.btns}>
                    <Button size='small' text='탈퇴 확인' />
                    <Button size='small' text='탈퇴 취소' />
                </div>
            </div>
        </>
    );
}

export default ReSign;