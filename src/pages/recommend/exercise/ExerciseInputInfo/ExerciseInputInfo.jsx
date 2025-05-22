// import styles from 'pages/helpers/ExerciseInputInfo/FormContent.module.css';
import 'utils/helpers/exerciseInputInfo.js';

import FormContainer from 'components/recommend/FormContainer/FormContainer';
import FormTitle from 'components/recommend/FormTitle/FormTitle';
import FormContent from 'components/recommend/FormContent/FormContent';

export default function ExerciseInputInfo() {

    return (
        <FormContainer>
            <FormTitle text="운동 추천" />
            <FormContent />
        </FormContainer>
    );
};