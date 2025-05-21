import styles from 'pages/exercise/inputInformation/ExerciseInputInfo.module.css';

import Input from 'components/common/input/Input';
import Button from 'components/common/button/Button';
import SelectForm from '../selectForm/SelectForm';

import { useState } from 'react';

export default function FormContent() {

    const [selected, setSelected] = useState('');
    const [tdee, setTdee] = useState('');

    // 운동 목적 select
    const purposeOptions = [
        { value: 'none', label: '===선택===' },
        { value: 'physical', label: '체력 강화' },
        { value: 'strength', label: '근력 증진' },
        { value: 'healthy', label: '건강 유지' },
        { value: 'diet', label: '체중 감량' },
    ];

    // 운동 목적 == 체중감량일 때 select
    const purposeDiet = [
        { value: 'none', label: '===선택===' },
        { value: '1', label: '거의 하지 않음' },
        { value: '2', label: '주 1~3회 운동' },
        { value: '3', label: '주 4~5회 운동' },
        { value: '4', label: '주 6~7회 운동' },
    ];

    return (
        <>
            <div className={styles.formBox}>
                <SelectForm
                    id="purpose"
                    label="운동 목적"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    options={purposeOptions}
                />
                <Input size="long" type="date" id="startedAt" label="시작일"></Input>
                <Input size="long" type="date" id="endedAt" label="종료일"></Input>

                {/* 목적 : 체중감량일 때 추가로 입력할 폼 */}
                {selected === 'diet' &&
                    <div>
                        <SelectForm
                            id='tdee'
                            label='활동수준'
                            value={tdee}
                            onChange={(e) => setTdee(e.target.value)}
                            options={purposeDiet} />
                        <Input size="long" type="number" id="purposeWeight" label="목표 몸무게"></Input>
                    </div>
                }
            </div>
            <Button size="long" text="다음"></Button>
        </>
    );

};