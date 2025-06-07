import Info from 'components/common/Info/Info';
import styles from './InfoEdit.module.css';
import input from 'assets/styles/common/input.module.css';
import button from 'assets/styles/common/button.module.css';
import error from 'assets/styles/common/error.module.css';
import label from 'assets/styles/common/label.module.css';
import { useEffect, useState } from 'react';
import { editUserInfo } from 'utils/api/profileApi.js';

function InfoEdit({ infoData, setIsEdit }) {
    const [isInfoChanged, setIsInfoChanged] = useState(false);

    const [editInfoData, setEditInfoData] = useState(
        {
            nickname: '',
            password: '',
            newPassword: '',
            checkPassword: '',
            phone: '',
            height: '',
            weight: '',
        },
    );

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
            nickname: '',
            password: '',
            newPassword: '',
            checkPassword: '',
            phone: '',
            height: '',
            weight: '',
        },
    );

    useEffect(() => {
        if (infoData) {
            setEditInfoData((prev) => ({
                ...prev, 
                ...infoData
            }));
        }
    }, [infoData]);

    useEffect(() => {
        if (!infoData) {
            return;
        }

        let isPasswordChanged = false;
        (
        editInfoData.newPassword !== '' ||
        editInfoData.checkPassword !== '')
            ? isPasswordChanged = true : isPasswordChanged = false; 


        let isOtherChanged = false;
        (editInfoData.nickname === infoData.nickname &&
        editInfoData.phone === infoData.phone &&
        Number(editInfoData.height) === Number(infoData.height) &&
        Number(editInfoData.weight) === Number(infoData.weight))
            ? isOtherChanged = false : isOtherChanged = true;
    
        (isPasswordChanged || isOtherChanged) ? setIsInfoChanged(true) : setIsInfoChanged(false) ;
    }, [editInfoData, infoData]);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        
        const parsedValue = (name == 'height' || name == 'weight')
        ? Number(value)
        : value;
        
        setEditInfoData((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    }

    const handleEditInfo = async () => {
        console.log(editInfoData);
        console.log(infoData);
        console.log(editInfoData.nickname === infoData.nickname);
        
        const updateInfoData = isChanged();
        console.log(updateInfoData);
        
        const result = await editUserInfo(updateInfoData);
        console.log("api 결과", result);

        if (result === 'success') {
            alert("정보수정에 성공하였습니다.");
            setIsEdit(false);
        }
    }

    const handleCancel = () => {
        setIsEdit(false);
    }

    const isChanged = () => {
        const updated = { ...editInfoData };
            
        if (updated.nickname == infoData.nickname) {
            updated.nickname = '';
        }
        if (updated.phone == infoData.phone) {
            updated.phone = '';
        }
        if (updated.height == infoData.height) {
            updated.height = null;
        }
        if (updated.weight == infoData.weight) {
            updated.weight = null;
        }

        return updated;
    }

    if (!editInfoData) return <div>로딩 중...</div>;

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
                            value={editInfoData.nickname}
                            onChange={handleOnChange}
                        />
                        {errors.nickname && (
                            <p className={`${error.error}`}>
                                {errors.nickname}
                            </p>
                        )}
                    </div>
                </Info>
                <Info kind="password" text="비밀번호">
                    <div className={`${styles.inputArea} ${styles.container}`}>
                        <label
                            className={`${label.label} ${label.input}`}
                            htmlFor="pwd">
                            기존 비밀번호
                        </label>
                        <input
                            className={`${input.input} ${input.long}`}
                            type="password"
                            id="password"
                            name="password"
                            onChange={(handleOnChange)}
                        />
                        {errors.password && (
                            <p className={`${error.error}`}>
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div className={`${styles.inputArea} ${styles.container}`}>
                        <label
                            className={`${label.label} ${label.input}`}
                            htmlFor="newPwd">
                            새 비밀번호
                        </label>
                        <input
                            className={`${input.input} ${input.long}`}
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            onChange={handleOnChange}
                            readOnly={true}
                        />
                        {errors.newPassword && (
                            <p className={`${error.error}`}>
                                {errors.newPassword}
                            </p>
                        )}
                    </div>
                    <div className={`${styles.inputArea} ${styles.container}`}>
                        <label
                            className={`${label.label} ${label.input}`}
                            htmlFor="checkPwd">
                            비밀번호 확인
                        </label>
                        <input
                            className={`${input.input} ${input.long}`}
                            type="password"
                            id="checkPassword"
                            name="checkPassword"
                            onChange={handleOnChange}
                            readOnly={true}
                        />
                        {errors.checkPassword && (
                            <p className={`${error.error}`}>
                                {errors.checkPassword}
                            </p>
                        )}
                    </div>
                </Info>
                <Info kind="phone" text="휴대폰">
                    <div className={styles.inputArea}>
                        <div className={styles.phoneArea}>
                            <input
                                className={`${input.input} ${styles.tel}`}
                                type="tel"
                                id="phone"
                                name="phone"
                                value={editInfoData.phone}
                                onChange={handleOnChange}
                            />
                        </div>
                        {errors.phone && (
                            <p className={`${error.error}`}>{errors.phone}</p>
                        )}
                    </div>
                </Info>
                <Info kind="body" text="신장/체중">
                    <div className={`${styles.inputArea} ${styles.container}`}>
                        <label
                            className={`${label.label} ${label.input}`}
                            htmlFor="height">
                            신장
                        </label>
                        <div className={styles.body}>
                            <input
                                className={`${input.input} ${input.short}`}
                                type="number"
                                id="height"
                                name="height"
                                value={editInfoData.height}
                                onChange={handleOnChange}
                            />
                            <p className={styles.p}>cm</p>
                        </div>
                        {errors.height && (
                            <p className={`${error.error}`}>{errors.height}</p>
                        )}
                    </div>
                    <div className={`${styles.inputArea} ${styles.container}`}>
                        <label
                            className={`${label.label} ${label.input}`}
                            htmlFor="weight">
                            체중
                        </label>
                        <div className={styles.body}>
                            <input
                                className={`${input.input} ${input.short}`}
                                type="number"
                                id="weight"
                                name="weight"
                                value={editInfoData.weight}
                                onChange={handleOnChange}
                            />
                            <p className={styles.p}>kg</p>
                        </div>
                        {errors.weight && (
                            <p className={`${error.error}`}>{errors.weight}</p>
                        )}
                    </div>
                </Info>
            </div>
            <div className={styles.btnArea}>
                <div className={styles.btn}>
                    <button 
                        className={`${button.button} ${button.short}`}
                        onClick={handleEditInfo}
                        disabled={!isInfoChanged}
                    >
                        수정
                    </button>
                    <button 
                        className={`${button.button} ${button.short}`}
                        onClick={handleCancel}
                    >
                        취소
                    </button>
                </div>
            </div>
        </>
    );
}

export default InfoEdit;
