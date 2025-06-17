import { useEffect, useState } from 'react';
import DietInputInfo from './DietInputInfo/DietInputInfo';
import DietRepeatDay from './DietRepeatDay/DietRepeatDay';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMemberDetail, fetchTodoDataByTodoId } from 'utils/api/exerciseApi';
import RecommendDiet from './DietRecommend/RecommendDiet';
import { successAlert } from 'utils/helpers/toastUtils';

function AllDietPages() {
    const navigate = useNavigate();

    const { todoId: paramTodoId } = useParams();
    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({
        startedAt: '',
        endedAt: '',
        purpose: '',
        category: 'DIET',
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

    const performData = async () => {
        successAlert('식단이 저장되었습니다! (구현 중...)');
        navigate('/todo');
    };

    const goToNext = async () => {
        setStep(step + 1);
    };

    return (
        <>
            {!paramTodoId && (
                <>
                    {step === 0 && (
                        <DietInputInfo
                            goToNext={goToNext}
                            formData={formData}
                            setFormData={setFormData}
                            weight={memberDetail.weight}
                        />
                    )}

                    {step === 1 && (
                        <DietRepeatDay
                            goToNext={goToNext}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}

                    {step === 2 && (
                        <RecommendDiet
                            goToNext={performData}
                            dayRepeat={formData.dayRepeat || 7}
                        />
                    )}
                </>
            )}

            {paramTodoId && (
                <RecommendDiet
                    goToNext={performData}
                    dayRepeat={formData.dayRepeat || 7}
                />
            )}
        </>
    );
}

export default AllDietPages;
