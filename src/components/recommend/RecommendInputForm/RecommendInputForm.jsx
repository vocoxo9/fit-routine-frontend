import { useState } from 'react';

import SelectForm from '../SelectForm/SelectForm';
import Input from 'components/common/Input/Input';

const RecommendInputForm = () => {

    const getToday = () => {
        return new Date().toISOString().substring(0, 10);
    }

    const [userData, setUserData] = useState({
        purpose: '',
        startedAt: getToday(),
        endedAt: '',
    });

    const [dietUserData, setDietUserData] = useState({
        tdee: '',
        golaWeight: '',
    });

    const submitHandler = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
        setDietUserData(prev => ({
            ...prev,
            [name] : value
        }))
    };

    // const [purpose, setPurpose] = useState('');
    // const [startedAt, setStartedAt] = useState(getToday);
    // const [endedAt, setEndedAt] = useState('');
    // const [tdee, setTdee] = useState('');
    // const [purposeWeight, setPurposeWeight] = useState('');

    // 운동 목적
    const selectPurpose = [
        { value: 'none', label: '===선택===' },
        { value: 'physical', label: '체력 강화' },
        { value: 'strength', label: '근력 증진' },
        { value: 'healthy', label: '건강 유지' },
        { value: 'diet', label: '체중 감량' },
    ];

    // 운동 목적 == 체중감량일 때
    const selectByPurposeDiet = [
        { value: 'none', label: '===선택===' },
        { value: '1', label: '거의 하지 않음' },
        { value: '2', label: '주 1~3회 운동' },
        { value: '3', label: '주 4~5회 운동' },
        { value: '4', label: '주 6~7회 운동' },
    ];

    return (
        <>
            <SelectForm
                id="purpose"
                label="운동 목적"
                value={userData.purpose}
                onChange={submitHandler}
                options={selectPurpose}
            />
            <Input
                size="long" type="date"
                id="startedAt" label="시작일"
                value={userData.startedAt}
                onChange={submitHandler}
                min={userData.startedAt} />
            <Input
                size="long" type="date"
                id="endedAt" label="종료일"
                value={userData.endedAt}
                onChange={submitHandler}
                min={userData.startedAt} />

            {/* 목적 : 체중감량일 때 추가로 입력할 폼 */}
            {userData.purpose === 'diet' &&
                <div>
                    <SelectForm
                        id='tdee'
                        label='활동수준'
                        value={dietUserData.tdee}
                        onChange={submitHandler}
                        options={selectByPurposeDiet} />
                    <Input
                        size="long" type="number"
                        id="purposeWeight" label="목표 몸무게"
                        value={dietUserData.golaWeight}
                        onChange={submitHandler} />
                </div>
            }
        </>
    );

}

export default RecommendInputForm;