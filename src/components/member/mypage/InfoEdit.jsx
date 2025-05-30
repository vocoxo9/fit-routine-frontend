import Info from 'components/common/Info/Info';
import styles from './InfoEdit.module.css';
import input from 'assets/styles/common/input.module.css';
import button from 'assets/styles/common/button.module.css';
import error from 'assets/styles/common/error.module.css';
import { useState } from 'react';

function InfoEdit() {
    const [errors, setErrors] = useState(
        // {
        //     nickname : '닉네임을 입력하세요',
        //     password : '비밀번호를 입력하세요',
        //     newPassword : '비밀번호를 입력하세요',
        //     checkPassword : '일치하지 않습니다.',
        //     phone : '연락처가 올바르지 않습니다.',
        //     height : '신장을 올바르게 입력하세요',
        //     weight : '체중을 올바르게 입력하세요',
        // }
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
                        className={`${input.input} ${input.long}`}
                        type="text"
                        id="nickname"
                        name="nickname"
                    />
                    {errors.nickname && 
                        <p className={`${error.error}`}>{errors.nickname}</p> 
                    }
                    </div>
                </Info>
                <Info kind="password" text="비밀번호">
                    <div className={styles.inputArea}>
                        <label htmlFor="pwd">기존 비밀번호</label>
                        <input
                            className={`${input.input} ${input.long}`}
                            type="password"
                            id="pwd"
                            name="pwd"
                        />
                        {errors.password && 
                            <p className={`${error.error}`}>{errors.password}</p> 
                        }
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="newPwd">새 비밀번호</label>
                        <input
                            className={`${input.input} ${input.long}`}
                            type="password"
                            id="newPwd"
                            name="newPwd"
                            readOnly={true}
                        />
                        {errors.newPassword && 
                            <p className={`${error.error}`}>{errors.newPassword}</p> 
                        }
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="checkPwd">비밀번호 확인</label>
                        <input
                            className={`${input.input} ${input.long}`}
                            type="password"
                            id="checkPwd"
                            name="checkPwd"
                            readOnly={true}
                        />
                        {errors.checkPassword && 
                            <p className={`${error.error}`}>{errors.checkPassword}</p> 
                        }
                    </div>
                </Info>
                <Info kind="phone" text="휴대폰">
                    <div className={styles.inputArea}>
                        <div className={styles.phoneArea}>
                            <input className={`${input.input} ${input.short}`} type="tel" id="phone" name="phone" />
                            <input className={`${input.input} ${input.short}`} type="tel" id="phone" name="phone" />
                            <input className={`${input.input} ${input.short}`} type="tel" id="phone" name="phone" />
                        </div>
                        {errors.phone && 
                            <p className={`${error.error}`}>{errors.phone}</p> 
                        }
                    </div>
                </Info>
                <Info kind="body" text="신장/체중">
                    <div className={styles.inputArea}>
                        <label htmlFor="height">신장</label>
                        <div className={styles.body}>
                            <input
                                className={`${input.input} ${input.short}`}
                                type="number"
                                id="height"
                                name="height"
                                />
                            <p className={styles.p}>cm</p>
                        </div>
                        {errors.height && 
                            <p className={`${error.error}`}>{errors.height}</p> 
                        }
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="weight">체중</label>
                        <div className={styles.body}>
                            <input
                                className={`${input.input} ${input.short}`}
                                type="number"
                                id="weight"
                                name="weight"
                            />
                            <p className={styles.p}>kg</p>
                        </div>
                        {errors.weight && 
                            <p className={`${error.error}`}>{errors.weight}</p> 
                        }
                    </div>
                </Info>
            </div>
            <div className={styles.btnArea}>
                <div className={styles.btn}>
                    <button className={`${button.button} ${button.short}`}>수정</button>
                    <button className={`${button.button} ${button.short}`}>취소</button>
                </div>
            </div>
        </>
    );
}

export default InfoEdit;
