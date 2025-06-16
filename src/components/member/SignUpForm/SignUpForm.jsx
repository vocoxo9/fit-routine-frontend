import React, { useEffect, useState } from 'react';
import styles from './SignUpForm.module.css';
import buttonStyles from 'assets/styles/common/button.module.css';
import errorStyles from 'assets/styles/common/error.module.css';
import formStyles from 'assets/styles/common/form.module.css';
import inputStyles from 'assets/styles/common/input.module.css';
import labelStyles from 'assets/styles/common/label.module.css';
import {
    checkEmailDuplicate,
    checkPhoneNumberDuplicate,
    checkNicknameDuplicate,
    createMember,
} from 'utils/api/memberApi';
import {
    validateEmail,
    validateNickname,
    validatePassword,
    validatePhoneNumber,
    validateHeight,
    validateWeight,
} from 'utils/helpers/validation';
import useDebounce from 'utils/hooks/debounce';
import { getTodayDate } from 'utils/helpers/calculator';
import { useNavigate } from 'react-router-dom';

const checkForm = (formData) => {
    const errors = {};

    const {
        email,
        password,
        phoneNumber,
        nickname,
        birthdate,
        height,
        weight,
        gender,
    } = formData;

    if (!email) {
        errors.email = '이메일을 입력해주세요.';
    }

    if (!password) {
        errors.password = '비밀번호를 입력해주세요.';
    }

    if (!phoneNumber) {
        errors.phoneNumber = '전화번호를 입력해주세요.';
    }

    if (!nickname) {
        errors.nickname = '닉네임을 입력해주세요.';
    }

    if (!birthdate) {
        errors.birthdate = '생일을 입력해주세요.';
    }

    if (!height) {
        errors.height = '신장을 입력해주세요.';
    }

    if (!weight) {
        errors.weight = '체중을 입력해주세요.';
    }

    if (!gender) {
        errors.gender = '성별을 선택해주세요.';
    }

    return errors;
};

const validateForm = async (formData) => {
    const errors = {};

    const { email, password, phoneNumber, nickname, height, weight } = formData;

    if (email) {
        if (!validateEmail(email)) {
            errors.email = '이메일이 유효하지 않습니다.';
        } else if (await checkEmailDuplicate(email)) {
            errors.email = '이미 사용 중인 이메일입니다.';
        }
    }

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

const SignUpForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        nickname: '',
        birthdate: '',
        height: '',
        weight: '',
        gender: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        nickname: '',
        birthdate: '',
        height: '',
        weight: '',
        gender: '',
    });

    const debouncedFormData = useDebounce(formData, 500);

    useEffect(() => {
        // noinspection JSCheckFunctionSignatures
        validateForm(debouncedFormData).then((errors) => setErrors(errors));
    }, [debouncedFormData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const checkErrors = checkForm(formData);
        setErrors(checkErrors);

        if (Object.keys(checkErrors).length > 0) {
            return;
        }

        const validateErrors = await validateForm(formData);
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length > 0) {
            return;
        }

        const memberData = {
            email: formData.email,
            password: formData.password,
            nickname: formData.nickname,
            gender: (formData.gender === 'male' && 'M') ||
                (formData.gender === 'female' && 'F'),
            birthAt: formData.birthdate,
            phone: formData.phoneNumber,
            height: formData.height,
            weight: formData.weight,
        };

        try {
            const response = await createMember(memberData);
            navigate(
                '/welcome',
                {
                    state: {
                        nickname: response.nickname,
                    },
                },
            );
        } catch (error) {
            navigate('/error');
        }
    };

    return (
        <form className={`${formStyles.form} ${formStyles.common}`}>
            <h1 className={styles.title}>
                가입 페이지
            </h1>

            {/* 이메일 입력 필드 */}
            <div className={styles.container}>
                <label
                    className={`${labelStyles.label}`}
                    htmlFor="email"
                >
                    이메일
                </label>
                <input
                    className={`${inputStyles.input} ${inputStyles.long}`}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p className={`${errorStyles.error}`}>
                        {errors.email}
                    </p>
                )}
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className={styles.container}>
                <label
                    className={`${labelStyles.label}`}
                    htmlFor="password"
                >
                    비밀번호
                </label>
                <input
                    className={`${inputStyles.input} ${inputStyles.long}`}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && (
                    <p className={`${errorStyles.error}`}>
                        {errors.password}
                    </p>
                )}
            </div>

            {/* 전화번호 입력 필드 */}
            <div className={styles.container}>
                <label
                    className={`${labelStyles.label}`}
                    htmlFor="phoneNumber"
                >
                    전화번호
                </label>
                <input
                    className={`${inputStyles.input} ${inputStyles.long}`}
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                {errors.phoneNumber && (
                    <p className={`${errorStyles.error}`}>
                        {errors.phoneNumber}
                    </p>
                )}
            </div>

            {/* 닉네임 입력 필드 */}
            <div className={styles.container}>
                <label
                    className={`${labelStyles.label}`}
                    htmlFor="nickname"
                >
                    닉네임
                </label>
                <input
                    className={`${inputStyles.input} ${inputStyles.long}`}
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                />
                {errors.nickname && (
                    <p className={`${errorStyles.error}`}>
                        {errors.nickname}
                    </p>
                )}
            </div>

            {/* 생년월일 입력 필드 */}
            <div className={styles.container}>
                <label
                    className={`${labelStyles.label}`}
                    htmlFor="birthdate"
                >
                    생년월일
                </label>
                <input
                    className={`${inputStyles.input} ${inputStyles.long}`}
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    max={getTodayDate()}
                />
                {errors.birthdate && (
                    <p className={`${errorStyles.error}`}>
                        {errors.birthdate}
                    </p>
                )}
            </div>

            {/* 성별 선택 라디오 박스 */}
            <div>
                <div className={styles.radios}>

                    {/* 남성 라디오 버튼 */}
                    <div className={styles.radio}>
                        <input
                            className={`${inputStyles.input}`}
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                        />
                        <label
                            className={`${labelStyles.label}`}
                            htmlFor="male"
                        >
                            남성
                        </label>
                    </div>

                    {/* 여성 라디오 버튼 */}
                    <div className={styles.radio}>
                        <input
                            className={`${inputStyles.input}`}
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                        />
                        <label
                            className={`${labelStyles.label}`}
                            htmlFor="female"
                        >
                            여성
                        </label>
                    </div>

                </div>
                {errors.gender && (
                    <p className={`${errorStyles.error}`}>
                        {errors.gender}
                    </p>
                )}
            </div>

            {/* 신장 입력 필드 */}
            <div className={styles.container}>
                <label
                    className={`${labelStyles.label}`}
                    htmlFor="height"
                >
                    신장
                </label>
                <input
                    className={`${inputStyles.input} ${inputStyles.long}`}
                    type="text"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                />
                {errors.height && (
                    <p className={`${errorStyles.error}`}>
                        {errors.height}
                    </p>
                )}
            </div>

            {/* 체중 입력 필드 */}
            <div className={styles.container}>
                <label
                    className={`${labelStyles.label}`}
                    htmlFor="weight"
                >
                    체중
                </label>
                <input
                    className={`${inputStyles.input} ${inputStyles.long}`}
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                />
                {errors.weight && (
                    <p className={`${errorStyles.error}`}>
                        {errors.weight}
                    </p>
                )}
            </div>

            <button
                className={`${styles.button} ${buttonStyles.button} ${buttonStyles.long}`}
                onClick={handleSubmit}
                disabled={
                    Object.values(formData).some((value) => !value) ||
                    Object.values(errors).some((value) => value)
                }
            >
                다음
            </button>
        </form>
    );
};

export default SignUpForm;