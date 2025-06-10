import Info from 'components/common/Info/Info';
import styles from './InfoEdit.module.css';
import input from 'assets/styles/common/input.module.css';
import button from 'assets/styles/common/button.module.css';
import error from 'assets/styles/common/error.module.css';
import label from 'assets/styles/common/label.module.css';
import { useEffect, useState } from 'react';
import {
    checkPhoneNumberDuplicate,
    checkNicknameDuplicate,
} from 'utils/api/memberApi';
import { editUserInfo } from 'utils/api/profileApi.js';
import {
    validateNickname,
    validatePassword,
    validatePhoneNumber,
    validateHeight,
    validateWeight,
} from 'utils/helpers/validation';

const checkForm = (infoData) => {
    const errors = {};

    const {
        email,
        phone,
        nickname,
        birthAt,
        height,
        weight,
        gender,
    } = infoData;

    if (!phone) {
        errors.phone = '전화번호를 입력해주세요.';
    }

    if (!nickname) {
        errors.nickname = '닉네임을 입력해주세요.';
    }

    if (!height) {
        errors.height = '신장을 입력해주세요.';
    }

    if (!weight) {
        errors.weight = '체중을 입력해주세요.';
    }

    return errors;
};

const validateForm = async (infoData) => {
    const errors = {};

    const { email, password, phoneNumber, nickname, height, weight } = infoData;

    if (password) {
        if (!validatePassword(password)) {
            errors.password = '비밀번호가 유효하지 않습니다.';
        }
    }

    if (phoneNumber) {
        if (!validatePhoneNumber(phoneNumber)) {
            errors.phoneNumber = '전화번호가 유효하지 않습니다.';
        } else if (await checkPhoneNumberDuplicate(phoneNumber)) {
            errors.phoneNumber = '이미 사용 중인 전화번호입니다.';
        }
    }

    if (nickname) {
        if (!validateNickname(nickname)) {
            errors.nickname = '닉네임이 유효하지 않습니다.';
        } else if (await checkNicknameDuplicate(nickname)) {
            errors.nickname = '이미 사용 중인 닉네임입니다.';
        }
    }

    if (height) {
        if (!validateHeight(height)) {
            errors.height = '올바른 신장을 입력해주세요.';
        }
    }

    if (weight) {
        if (!validateWeight(weight)) {
            errors.weight = '올바른 체중을 입력해주세요.';
        }
    }

    return errors;
};

const hasErrors = (errors) => {
  return Object.values(errors).some(msg => msg);
};

function InfoEdit({ infoData, setIsEdit }) {
    const [isInitialized, setIsInitialized] = useState(false);
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

    const validateAll = async () => {
        const formErrors = checkForm(editInfoData);
        const validateErrors = await validateForm(editInfoData);
        const errors = { ...formErrors, ...validateErrors };

        setErrors(errors);
    };

    useEffect(() => {
        if (infoData) {
            setEditInfoData((prev) => ({
                ...prev, 
                ...infoData
            }));
            setIsInitialized(true);
        }
    }, [infoData]);

    useEffect(() => {
        if (!infoData || !isInitialized) {
            return;
        }

        validateAll();

        const isPasswordChanged = !!(editInfoData.newPassword || editInfoData.checkPassword);

        const isOtherChanged = !!(
            editInfoData.nickname !== infoData.nickname ||
            editInfoData.phone !== infoData.phone ||
            Number(editInfoData.height) !== Number(infoData.height) ||
            Number(editInfoData.weight) !== Number(infoData.weight)
        );
        
        setIsInfoChanged(isPasswordChanged || isOtherChanged);

        checkForm(editInfoData);
        validateForm(editInfoData);
    }, [editInfoData, infoData]);

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        const parsedValue = (name === 'height' || name === 'weight') ? 
            Number(value) : 
            value;
        
        setEditInfoData((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    }

    const handleEditInfo = async () => {
        const updateInfoData = isChanged();
        
        const result = await editUserInfo(updateInfoData);

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
            
        if (updated.nickname === infoData.nickname) {
            updated.nickname = null;
        }
        if (updated.newPassword === updated.password) {
            updated.newPassword = null;
        }
        if (updated.phone === infoData.phone) {
            updated.phone = null;
        }
        if (updated.height === infoData.height) {
            updated.height = null;
        }
        if (updated.weight === infoData.weight) {
            updated.weight = null;
        }
        updated.password = null;
        updated.checkPassword = null;

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
                        disabled={!isInfoChanged || hasErrors(errors)}
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
