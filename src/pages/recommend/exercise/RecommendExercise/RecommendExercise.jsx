import RoutineRecommendForm from 'components/recommend/RoutineRecommendForm/RoutineRecommendForm';

function RecommendExercise({
    paramTodoId,
    goToNext,
    formData,
    setFormData,
    memberDetail,
    exerciseList,
    buttonText,
}) {
    return (
        <RoutineRecommendForm
            paramTodoId={paramTodoId}
            goToNext={goToNext}
            formData={formData}
            setFormData={setFormData}
            memberDetail={memberDetail}
            exerciseList={exerciseList}
            buttonText={buttonText}
        />
    );
}

export default RecommendExercise;
