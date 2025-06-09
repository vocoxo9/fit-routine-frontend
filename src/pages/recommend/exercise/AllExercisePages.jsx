import { useState } from 'react';
import ExerciseInputInfo from './ExerciseInputInfo/ExerciseInputInfo';
import ExerciseRepeatsDay from './ExerciseRepeatsDay/ExerciseRepeatsDay';
import RecommendExercise from './RecommendExercise/RecommendExercise';
import { useNavigate } from 'react-router-dom';

function AllExercisePages() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        purpose: '',
        category: 'exercise',
        tdee: '',
        goalWeight: '',
        dayRepeat: '',
        // exerciseList: [],
    });

    const [step, setStep] = useState(0);

    const performData = () => {
        alert('운동 루틴이 저장되었습니다!');
        navigate('/todo');
        console.log('제출 데이터 :: ', formData);
    };

    const goToNext = () => {
        step === 2 ? performData() : setStep(step + 1);
    };

    return (
        <>
            {step === 0 && (
                <ExerciseInputInfo
                    goToNext={goToNext}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}

            {step === 1 && (
                <ExerciseRepeatsDay
                    goToNext={goToNext}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}

            {step === 2 && (
                <RecommendExercise
                    goToNext={goToNext}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
        </>
    );
}

export default AllExercisePages;
