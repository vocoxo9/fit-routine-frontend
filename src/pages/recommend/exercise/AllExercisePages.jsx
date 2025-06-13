import { useEffect, useState } from 'react';
import ExerciseInputInfo from './ExerciseInputInfo/ExerciseInputInfo';
import ExerciseRepeatDay from './ExerciseRepeatDay/ExerciseRepeatDay';
import RecommendExercise from './RecommendExercise/RecommendExercise';
import { useNavigate, useParams } from 'react-router-dom';
import {
    fetchMemberDetail,
    fetchRegistExerciseRoutine,
    fetchTodoDataByTodoId,
} from 'utils/api/exerciseApi';

function AllExercisePages() {
    const navigate = useNavigate();
    const { todoId } = useParams();
    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({
        startedAt: '',
        endedAt: '',
        purpose: '',
        category: 'exercise',
        tdee: '',
        goalWeight: '',
        dayRepeat: '',
        // exerciseList: [],
    });

    const [memberDetail, setMemberDetail] = useState({});

    useEffect(() => {
        if (todoId) {
            fetchTodoDataByTodoId(todoId).then((data) => {
                setFormData(data);
            });
        }

        fetchMemberDetail().then((data) => {
            setMemberDetail(data);
        });
    }, [todoId]);

    const performData = () => {
        alert('운동 루틴이 저장되었습니다!');
        console.log(formData);
        const response = fetchRegistExerciseRoutine(formData);
        console.log(response);
        navigate('/todo');
    };

    const goToNext = () => {
        step === 2 ? performData() : setStep(step + 1);
    };

    return (
        <>
            {!todoId && (
                <>
                    {step === 0 && (
                        <ExerciseInputInfo
                            goToNext={goToNext}
                            formData={formData}
                            setFormData={setFormData}
                            weight={memberDetail.weight}
                        />
                    )}

                    {step === 1 && (
                        <ExerciseRepeatDay
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
                            memberDetail={memberDetail}
                            buttonText="루틴 등록"
                        />
                    )}
                </>
            )}

            {todoId && (
                <RecommendExercise
                    todoId={todoId}
                    goToNext={performData}
                    formData={formData}
                    setFormData={setFormData}
                    memberDetail={memberDetail}
                    buttonText="루틴 수정"
                />
            )}
        </>
    );
}

export default AllExercisePages;
