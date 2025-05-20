import 'pages/exercise/inputInformation/ExerciseInputInfo.css';
import 'utils/exercise/exerciseInputInfo.js';

import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function ExerciseInputInfo() {

    const [selected, setSelected] = useState('');

    return (
        <div className="exerciseInformation container mainContainer">
            <div className="exerciseInformation form formBox">
                <div className="exerciseInformation form title">
                    <p>운동 추천</p>
                </div>
                <div className="exerciseInformation form inputForm">
                    <label htmlFor="purpose">운동 목적</label>
                    <select id="purpose" onChange={(e) => setSelected(e.target.value)} value={selected}>
                        <option value="none">==선택==</option>
                        <option value="physical">체력 강화</option>
                        <option value="strength">근력 증진</option>
                        <option value="healthy">건강 유지</option>
                        <option value="diet">체중 감량</option>
                    </select>

                    <label htmlFor="startDate">시작일</label>
                    <input type="date" id="startedAt" />

                    <label htmlFor="endedAt">종료일</label>
                    <input type="date" id="endedAt" />

                    {/* 목적 : 체중감량일 때 추가로 입력할 폼 */}
                    {selected === 'diet' &&
                        <div className="exerciseInformation form purposeDiet">
                            <label htmlFor="tdee">활동수준</label>
                            <select id="tdee">
                                <option value="none">==선택==</option>
                                <option value="">거의 하지 않음</option>
                                <option value="">주 1~3회 운동</option>
                                <option value="">주 4~5회 운동</option>
                                <option value="">주 6~7회 운동</option>
                            </select>

                            <label htmlFor="purposeWeight">목표 몸무게</label>
                            <input type="number" id="purposeWeight" />
                        </div>
                    }

                    {/* 반복일 설정 페이지로 이동 */}
                    <Link to="#" >
                        <button className="exerciseInformation form nextButton" >다음</button>
                    </Link>
                </div>
            </div>
        </div>
    );

};