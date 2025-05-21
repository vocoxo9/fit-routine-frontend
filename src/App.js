import styles from './assets/styles/common/Reset.module.css'

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import SuggestRoutine from 'pages/exercise/suggestRoutine/SuggestRoutine';
import ExerciseInputInfo from 'pages/exercise/inputInformation/ExerciseInputInfo';
import ExerciseRepeatsDay from 'pages/exercise/selectRepeatsDay/ExerciseRepeatsDay';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className={styles.layout}>
          
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
