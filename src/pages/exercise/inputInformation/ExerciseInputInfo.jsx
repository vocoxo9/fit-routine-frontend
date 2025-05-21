// import styles from 'pages/exercise/inputInformation/ExerciseInputInfo.module.css';
import 'utils/exercise/exerciseInputInfo.js';

import FormContainer from 'components/recommend/form/FormContainer';
import FormTitle from 'components/recommend/title/FormTitle';
import FormContent from 'components/recommend/form/FormContent';

export default function ExerciseInputInfo() {

    return (
        <FormContainer>
            <FormTitle text="운동 추천" />
            <FormContent />
        </FormContainer>
    );
};