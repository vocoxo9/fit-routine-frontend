import Info from 'components/common/Info/Info';
import styles from './InfoEdit.module.css';
import { useState } from 'react';

function InfoEdit() {
    const [errors, setErrors] = useState(
        {
            nickname : '',
            password : '',
            newPassword : '',
            checkPassword : '',
            phone : '',
            height : '',
            weight : '',
        }
    );

    return (
        <>
            <div className={styles.subTitle}>정보 수정</div>
            <div className={styles.table}>
                <Info kind="nickName" text="닉네임">
                    <div className={styles.inputArea}>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                    />
                    {
                        <p>{errors.nickname ? errors.nickname : ''}</p> 
                    }
                    </div>
                </Info>
                <Info kind="password" text="비밀번호">
                    <div className={styles.inputArea}>
                        <label htmlFor="pwd">기존 비밀번호</label>
                        <input
                            type="password"
                            id="pwd"
                            name="pwd"
                        />
                        {
                            <p>{errors.password ? errors.password : ''}</p> 
                        }
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="newPwd">새 비밀번호</label>
                        <input
                            type="password"
                            id="newPwd"
                            name="newPwd"
                            readOnly={true}
                        />
                        {
                            <p>{errors.newPassword ? errors.newPassword : ''}</p> 
                        }
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="checkPwd">비밀번호 확인</label>
                        <input
                            type="password"
                            id="checkPwd"
                            name="checkPwd"
                            readOnly={true}
                        />
                        {
                            <p>{errors.checkPassword ? errors.checkPassword : ''}</p> 
                        }
                    </div>
                </Info>
                <Info kind="phone" text="휴대폰">
                    <div className={styles.inputArea}>
                        <div className={styles.phoneArea}>
                            <input type="number" id="phone" name="phone" />
                            <input type="number" id="phone" name="phone" />
                            <input type="number" id="phone" name="phone" />
                        </div>
                        {
                            <p>{errors.phone ? errors.phone : ''}</p> 
                        }
                    </div>
                </Info>
                <Info kind="body" text="신장/체중">
                    <label htmlFor="height">신장</label>
                    <div className={styles.body}>
                        <input
                            type="number"
                            id="height"
                            name="height"
                        />
                        <p className={styles.p}>cm</p>
                    </div>
                    {
                        <p>{errors.height ? errors.height : ''}</p> 
                    }
                    <label htmlFor="weight">체중</label>
                    <div className={styles.body}>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                        />
                        <p className={styles.p}>kg</p>
                    </div>
                    {
                        <p>{errors.weight ? errors.weight : ''}</p> 
                    }
                </Info>
            </div>
            <div className={styles.btnArea}>
                <div className={styles.btn}>
                    <button>수정</button>
                    <button>취소</button>
                </div>
            </div>
        </>
    );
}

export default InfoEdit;
