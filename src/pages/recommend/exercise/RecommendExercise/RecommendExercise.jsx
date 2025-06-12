import RoutineRecommendForm from 'components/recommend/RoutineRecommendForm/RoutineRecommendForm';

function RecommendExercise({
    todoId,
    goToNext,
    formData,
    setFormData,
    buttonText,
}) {
    return (
        <RoutineRecommendForm
            todoId={todoId}
            goToNext={goToNext}
            formData={formData}
            setFormData={setFormData}
            buttonText={buttonText}
        />
    );
}

export default RecommendExercise;
