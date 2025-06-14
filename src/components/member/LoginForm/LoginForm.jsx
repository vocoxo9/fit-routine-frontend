import React, { useEffect, useState } from 'react';
import styles from './LoginForm.module.css';
import buttonStyles from 'assets/styles/common/button.module.css';
import errorStyles from 'assets/styles/common/error.module.css';
import formStyles from 'assets/styles/common/form.module.css';
import inputStyles from 'assets/styles/common/input.module.css';
import labelStyles from 'assets/styles/common/label.module.css';
import { login } from 'utils/api/loginApi';
import { validateEmail, validatePassword } from 'utils/helpers/validation';
import useDebounce from 'utils/hooks/debounce';
import { useNavigate } from 'react-router-dom';

const getMissingRequiredErrors = (formData) => {
    const errors = {};
    const { email, password } = formData;

    if (!email) {
        errors.email = '이메일을 입력해주세요.';
    }

    if (!password) {
        errors.password = '비밀번호를 입력해주세요.';
    }

    return errors;
};

const getValidationErrors = async (formData) => {
    const errors = {};
    const { email, password } = formData;

    if (email) {
        if (!validateEmail(email)) {
            errors.email = '이메일이 유효하지 않습니다.';
        }
    }

    if (password) {
        if (!validatePassword(password)) {
            errors.password = '비밀번호가 유효하지 않습니다.';
        }
    }

    return errors;
};

const SignUpForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const debouncedFormData = useDebounce(formData, 500);

    useEffect(() => {
        // noinspection JSCheckFunctionSignatures
        getValidationErrors(debouncedFormData).then((errors) => setErrors(errors));
    }, [debouncedFormData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const missingRequiredErrors = getMissingRequiredErrors(formData);
        setErrors(missingRequiredErrors);

        if (Object.keys(missingRequiredErrors).length > 0) {
            return;
        }

        const validationErrors = await getValidationErrors(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const { email, password } = formData;
        try {
            await login({ email, password });
            window.location.replace('/');
        } catch (error) {
            // if (error.response?.status === 403) {
            //     alert('이메일 또는 비밀번호가 틀립니다.');
            // } else {
            //     navigate('/error');
            // }

            // 추후 백엔드에서 에러 코드 및 메시지가 명확해지면 수정
            alert('로그인 실패!');
        }
    };

    return (
        <form className={`${formStyles.form} ${formStyles.common}`}>
            <h1 className={styles.title}>
                로그인
            </h1>
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
            <button
                className={`${styles.button} ${buttonStyles.button} ${buttonStyles.long}`}
                onClick={handleSubmit}
                disabled={
                    Object.values(formData).some((value) => !value) ||
                    Object.values(errors).some((value) => value)
                }
            >
                로그인
            </button>
        </form>
    );
};

export default SignUpForm;