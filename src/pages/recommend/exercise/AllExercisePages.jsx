import { useEffect, useState } from 'react';
import ExerciseInputInfo from './ExerciseInputInfo/ExerciseInputInfo';
import ExerciseRepeatDay from './ExerciseRepeatDay/ExerciseRepeatDay';
import RecommendExercise from './RecommendExercise/RecommendExercise';
import { useNavigate, useParams } from 'react-router-dom';
import {
    fetchMemberDetail,
    fetchTodoDataByTodoId,
    submitExerciseRoutine,
    saveExerciseRoutineInfo,
} from 'utils/api/exerciseApi';

function AllExercisePages() {
    const navigate = useNavigate();
    const { todoId: paramTodoId } = useParams();
    const [todoId, setTodoId] = useState(paramTodoId || null);
    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({
        startedAt: '',
        endedAt: '',
        purpose: '',
        category: 'EXERCISE',
        dayRepeat: '',
        tdee: '',
        goalWeight: '',
    });

    const [memberDetail, setMemberDetail] = useState({});

    useEffect(() => {
        if (paramTodoId) {
            fetchTodoDataByTodoId(paramTodoId).then((data) => {
                setFormData(data);
            });
        }
    }, [paramTodoId]);

    useEffect(() => {
        fetchMemberDetail().then((data) => {
            setMemberDetail(data);
        });
    }, []);

    const saveData = async () => {
        const result = await saveExerciseRoutineInfo(formData);
        setTodoId(result);
        return result;
    };

    const performData = async (exerciseList) => {
        await submitExerciseRoutine(todoId, exerciseList);
        alert('운동 루틴이 저장되었습니다!');
        navigate('/todo');
    };

    const goToNext = async () => {
        if (step === 0) {
            setStep(step + 1);
        } else if (step === 1) {
            const result = await saveData();
            setStep(step + 1);
        }
    };

    return (
        <>
            {!paramTodoId && (
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
                            // todoId={todoId}
                            goToNext={performData}
                            formData={formData}
                            setFormData={setFormData}
                            memberDetail={memberDetail}
                            buttonText="루틴 등록"
                        />
                    )}
                </>
            )}

            {paramTodoId && (
                <RecommendExercise
                    paramTodoId={paramTodoId}
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
