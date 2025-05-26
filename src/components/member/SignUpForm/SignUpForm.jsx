import React, { useEffect, useState } from 'react';
import {
    checkEmailDuplicate,
    checkPhoneNumberDuplicate,
    checkNicknameDuplicate,
} from 'utils/api/memberApi';
import {
    validateEmail,
    validateNickname,
    validatePassword,
    validatePhoneNumber,
    validateHeight,
    validateWeight,
} from 'utils/helpers/validation';
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import Radio from 'components/common/Radio/Radio';
import RadioGroup from 'components/common/RadioGroup/RadioGroup';
import useDebounce from 'utils/hooks/debounce';

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

        // 임시 로직
        alert('제출 성공!');
    };

    return (
        <>
            <Input
                size="long"
                type="email"
                id="email"
                name="email"
                label="이메일"
                value={formData.email}
                error={errors.email}
                onChange={handleChange}
            />
            <Input
                size="long"
                type="password"
                id="password"
                name="password"
                label="비밀번호"
                value={formData.password}
                error={errors.password}
                onChange={handleChange}
            />
            <Input
                size="long"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                label="전화번호"
                value={formData.phoneNumber}
                error={errors.phoneNumber}
                onChange={handleChange}
            />
            <Input
                size="long"
                type="text"
                id="nickname"
                name="nickname"
                label="닉네임"
                value={formData.nickname}
                error={errors.nickname}
                onChange={handleChange}
            />
            <Input
                size="long"
                type="date"
                id="birthdate"
                name="birthdate"
                label="생년월일"
                value={formData.birthdate}
                error={errors.birthdate}
                onChange={handleChange}
            />
            <Input
                size="long"
                type="text"
                id="height"
                name="height"
                label="신장"
                value={formData.height}
                error={errors.height}
                onChange={handleChange}
            />
            <Input
                size="long"
                type="text"
                id="weight"
                name="weight"
                label="체중"
                value={formData.weight}
                error={errors.weight}
                onChange={handleChange}
            />
            <RadioGroup>
                <Radio
                    id="male"
                    name="gender"
                    value="male"
                    label="남성"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                />
                <Radio
                    id="female"
                    name="gender"
                    value="female"
                    label="여성"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                />
                {errors.gender && (
                    // 임시 태그, RadioGroup 혹은 Radio 내부로 이동해야 합니다.
                    <p
                        style={{
                            color: '#CC0000',
                            margin: '0.3rem 1rem 0.5rem',
                            fontSize: 'small',
                            fontWeight: 600,
                        }}>
                        {errors.gender}
                    </p>
                )}
            </RadioGroup>
            <Button
                size="small"
                text="다음"
                onClick={handleSubmit}
                disabled={
                    Object.values(formData).some((value) => !value) ||
                    Object.values(errors).some((value) => value)
                }
            />
        </>
    );
};

export default SignUpForm;
