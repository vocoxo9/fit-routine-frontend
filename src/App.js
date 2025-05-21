import styles from './assets/styles/common/Reset.module.css'

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import MainPage from 'pages/common/mainPage/MainPage';
import ExerciseInputInfo from 'pages/exercise/inputInformation/ExerciseInputInfo';
import ExerciseRepeatsDay from 'pages/exercise/selectRepeatsDay/ExerciseRepeatsDay';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className={styles.layout}>
          {/* <MainPage /> */}
          <ExerciseInputInfo />
          <ExerciseRepeatsDay />
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
