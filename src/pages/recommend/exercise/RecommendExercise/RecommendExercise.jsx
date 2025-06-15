import RoutineRecommendForm from 'components/recommend/RoutineRecommendForm/RoutineRecommendForm';

function RecommendExercise({
    paramTodoId,
    goToNext,
    formData,
    setFormData,
    memberDetail,
    buttonText,
}) {
    return (
        <RoutineRecommendForm
            paramTodoId={paramTodoId}
            goToNext={goToNext}
            formData={formData}
            setFormData={setFormData}
            memberDetail={memberDetail}
            buttonText={buttonText}
        />
    );
}

export default RecommendExercise;
