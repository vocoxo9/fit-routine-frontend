import {useEffect, useState} from "react";
import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";
import Select from "components/common/Select/Select";
import useDebounce from "utils/hooks/debounce";

const PURPOSE_OPTIONS = [
    {value: 'none', label: '선택'},
    {value: 'physical', label: '체력 강화'},
    {value: 'strength', label: '근력 증진'},
    {value: 'healthy', label: '건강 유지'},
    {value: 'diet', label: '체중 감량'},
]

const TDEE_LIST = [
    {value: 'none', label: '선택'},
    {value: '1', label: '거의 하지 않음'},
    {value: '2', label: '주 1~3회 운동'},
    {value: '3', label: '주 4~5회 운동'},
    {value: '4', label: '주 6~7회 운동'},
]

const getMissingRequiredErrors = formData => {
    const errors = {}

    const {
        purpose,
        startDate,
        endDate,
        tdee,
        goalWeight
    } = formData

    if (!purpose || purpose === 'none') {
        errors.purpose = '목적을 선택해주세요.'
    }

    if (!startDate) {
        errors.startDate = '시작일을 입력해주세요.'
    }

    if (!endDate) {
        errors.endDate = '종료일을 입력해주세요.'
    }

    if (purpose === 'diet') {
        if (!tdee || tdee === 'none') {
            errors.tdee = '활동 수준을 선택해주세요.'
        }

        if (!goalWeight) {
            errors.goalWeight = '목표 몸무게를 입력해주세요.'
        }
    }

    return errors
}

const getValidationErrors = async formData => {
    const errors = {}

    const {
        purpose,
        startDate,
        endDate,
        goalWeight
    } = formData

    if (startDate && endDate && startDate > endDate) {
        errors.endDate = '종료일이 시작일보다 이릅니다.'
    }

    if (purpose === 'diet' && goalWeight && (goalWeight < 0 || goalWeight > 500)) {
        errors.goalWeight = '목표 체중이 바르지 않습니다.'
    }

    return errors
}

const RecommendForm = () => {
    const [formData, setFormData] = useState({
        purpose: '',
        startDate: '',
        endDate: '',
        tdee: '',
        goalWeight: ''
    })

    const [errors, setErrors] = useState({
        purpose: '',
        startDate: '',
        endDate: '',
        tdee: '',
        goalWeight: ''
    })

    const debouncedFormData = useDebounce(formData, 500)

    useEffect(() => {
        getValidationErrors(debouncedFormData).then(errors =>
            setErrors(errors)
        )
    }, [debouncedFormData])

    const handleChange = event => {
        const {name, value} = event.target
        setFormData(previous => ({...previous, [name]: value}))
    }

    const handleSubmit = async event => {
        event.preventDefault()

        const missingRequiredErrors = getMissingRequiredErrors(formData)
        setErrors(missingRequiredErrors)

        if (Object.keys(missingRequiredErrors).length > 0) {
            return
        }

        const validationErrors = await getValidationErrors(formData)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            return
        }

        // 임시 로직
        alert('제출 성공!')
    }

    return (
        <>
            <Select
                id="purpose"
                name="purpose"
                label="운동 목적"
                value={formData.purpose}
                error={errors.purpose}
                onChange={handleChange}
                options={PURPOSE_OPTIONS}
            />
            <Input
                size="long"
                type="date"
                id="startDate"
                name="startDate"
                label="시작일"
                value={formData.startDate}
                error={errors.startDate}
                onChange={handleChange}
            />
            <Input
                size="long"
                type="date"
                id="endDate"
                name="endDate"
                label="종료일"
                value={formData.endDate}
                error={errors.endDate}
                onChange={handleChange}
            />
            {formData.purpose === 'diet' && (
                <>
                    <Select
                        id="tdee"
                        name="tdee"
                        label="활둥 수준"
                        value={formData.tdee}
                        error={errors.tdee}
                        onChange={handleChange}
                        options={TDEE_LIST}
                    />
                    <Input
                        size="long"
                        type="number"
                        id="goalWeight"
                        name="goalWeight"
                        label="목표 몸무게"
                        value={formData.goalWeight}
                        error={errors.goalWeight}
                        onChange={handleChange}
                    />
                </>
            )}
            <Button
                size='long'
                text='다음'
                onClick={handleSubmit}
            />
        </>
    )
}

export default RecommendForm;