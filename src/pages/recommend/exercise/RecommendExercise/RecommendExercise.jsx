import RoutineRecommendForm from 'components/recommend/RoutineRecommendForm/RoutineRecommendForm';

function RecommendExercise({
    todoId,
    goToNext,
    formData,
    setFormData,
    memberDetail,
    buttonText,
}) {
    return (
        <RoutineRecommendForm
            todoId={todoId}
            goToNext={goToNext}
            formData={formData}
            setFormData={setFormData}
            memberDetail={memberDetail}
            buttonText={buttonText}
        />
    );
}

export default RecommendExercise;
