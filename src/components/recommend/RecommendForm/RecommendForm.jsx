import React, { useEffect, useState } from 'react';
import useDebounce from 'utils/hooks/debounce';
import styles from './RecommendForm.module.css';
import buttonStyles from 'assets/styles/common/button.module.css';
import errorStyles from 'assets/styles/common/error.module.css';
import formStyles from 'assets/styles/common/form.module.css';
import inputStyles from 'assets/styles/common/input.module.css';
import labelStyles from 'assets/styles/common/label.module.css';
import selectStyles from 'assets/styles/common/select.module.css';

const PURPOSE_OPTIONS = [
    { value: 'none', label: '선택' },
    { value: 'ENDURANCE', label: '체력 강화' },
    { value: 'STRENGTH', label: '근력 증진' },
    { value: 'MAINTENANCE', label: '건강 유지' },
    { value: 'DIET', label: '체중 감량' },
];

const TDEE_LIST = [
    { value: 'none', label: '선택' },
    { value: '1', label: '거의 하지 않음' },
    { value: '2', label: '주 1~3회 운동' },
    { value: '3', label: '주 4~5회 운동' },
    { value: '4', label: '주 6~7회 운동' },
];

const getMissingRequiredErrors = (formData) => {
    const errors = {};

    const { purpose, startDate, endDate, tdee, goalWeight } = formData;

    if (!purpose || purpose === 'none') {
        errors.purpose = '목적을 선택해주세요.';
    }

    if (!startDate) {
        errors.startDate = '시작일을 입력해주세요.';
    }

    if (!endDate) {
        errors.endDate = '종료일을 입력해주세요.';
    }

    if (purpose === 'DIET') {
        if (!tdee || tdee === 'none') {
            errors.tdee = '활동 수준을 선택해주세요.';
        }

        if (!goalWeight) {
            errors.goalWeight = '목표 몸무게를 입력해주세요.';
        }
    }

    return errors;
};

const getValidationErrors = async (formData) => {
    const errors = {};

    const { purpose, startDate, endDate, goalWeight } = formData;

    if (startDate && endDate && startDate > endDate) {
        errors.endDate = '종료일이 시작일보다 이릅니다.';
    }

    if (
        purpose === 'DIET' &&
        goalWeight &&
        (goalWeight < 0 || goalWeight > 500)
    ) {
        errors.goalWeight = '목표 체중이 바르지 않습니다.';
    }

    return errors;
};

const RecommendForm = ({ title, goToNext, formData, setFormData }) => {
    // const [formData, setFormData] = useState({
    //     purpose: '',
    //     startDate: '',
    //     endDate: '',
    //     tdee: '',
    //     goalWeight: '',
    // });

    const [errors, setErrors] = useState({
        purpose: '',
        startDate: '',
        endDate: '',
        tdee: '',
        goalWeight: '',
    });

    const debouncedFormData = useDebounce(formData, 500);

    useEffect(() => {
        // noinspection JSCheckFunctionSignatures
        getValidationErrors(debouncedFormData).then((errors) =>
            setErrors(errors),
        );
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

        // 임시 로직
        alert('제출 성공!');
        goToNext();
    };

    return (
        <form className={`${formStyles.form} ${formStyles.common}`}>
            <h1 className={styles.title}>{title}</h1>

            {/* 목적 선택 필드 */}
            <div className={styles.container}>
                <label className={labelStyles.label} htmlFor="purpose">
                    운동 목적
                </label>
                <select
                    className={`${selectStyles.select} ${selectStyles.common}`}
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}>
                    {PURPOSE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.purpose && (
                    <p className={errorStyles.error}>{errors.purpose}</p>
                )}
            </div>

            {/* 시작일 입력 필드 */}
            <div className={styles.container}>
                <label className={labelStyles.label} htmlFor="startDate">
                    시작일
                </label>
                <input
                    className={`${inputStyles.input} ${inputStyles.long}`}
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
                {errors.startDate && (
                    <p className={errorStyles.error}>{errors.startDate}</p>
                )}
            </div>

            {/* 종료일 입력 필드 */}
            <div className={styles.container}>
                <label className={labelStyles.label} htmlFor="endDate">
                    종료일
                </label>
                <input
                    className={`${styles.fixInput} ${inputStyles.input} ${inputStyles.long}`}
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
                {errors.endDate && (
                    <p className={errorStyles.error}>{errors.endDate}</p>
                )}
            </div>

            {formData.purpose === 'DIET' && (
                <>
                    {/* 활동 수준 선택 필드 */}
                    <div className={styles.container}>
                        <label className={labelStyles.label} htmlFor="tdee">
                            활동 수준
                        </label>
                        <select
                            className={`${selectStyles.select} ${selectStyles.common}`}
                            id="tdee"
                            name="tdee"
                            value={formData.tdee}
                            onChange={handleChange}>
                            {TDEE_LIST.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.tdee && (
                            <p className={errorStyles.error}>{errors.tdee}</p>
                        )}
                    </div>

                    {/* 목표 몸무게 입력 필드 */}
                    <div className={styles.container}>
                        <label
                            className={labelStyles.label}
                            htmlFor="goalWeight">
                            목표 몸무게
                        </label>
                        <input
                            className={`${styles.fixInput} ${inputStyles.input} ${inputStyles.long}`}
                            type="text"
                            id="goalWeight"
                            name="goalWeight"
                            value={formData.goalWeight}
                            onChange={handleChange}
                        />
                        {errors.goalWeight && (
                            <p className={errorStyles.error}>
                                {errors.goalWeight}
                            </p>
                        )}
                    </div>
                </>
            )}

            <button
                className={`${styles.button} ${buttonStyles.button} ${buttonStyles.long}`}
                onClick={handleSubmit}>
                다음
            </button>
        </form>
    );
};

export default RecommendForm;
