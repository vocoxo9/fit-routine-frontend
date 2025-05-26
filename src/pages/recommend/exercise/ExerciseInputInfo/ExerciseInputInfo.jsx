import FormContainer from 'components/common/FormContainer/FormContainer';
import FormTitle from 'components/common/FormTitle/FormTitle';
import FormContent from 'components/common/FormContent/FormContent';
import RecommendForm from 'components/recommend/RecommendForm/RecommendForm';

export default function ExerciseInputInfo() {
    return (
        <FormContainer>
            <FormTitle text="운동 추천" />
            <FormContent>
                <RecommendForm />
            </FormContent>
        </FormContainer>
    );
}
