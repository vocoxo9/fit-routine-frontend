import RoutineRecommendForm from 'components/recommend/RoutineRecommendForm/RoutineRecommendForm';

function RecommendExercise({
    todoId,
    goToNext,
    formData,
    setFormData,
    exerciseList,
    setExerciseList,
    memberDetail,
    buttonText,
}) {
    return (
        <RoutineRecommendForm
            todoId={todoId}
            goToNext={goToNext}
            formData={formData}
            setFormData={setFormData}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
            memberDetail={memberDetail}
            buttonText={buttonText}
        />
    );
}

export default RecommendExercise;
