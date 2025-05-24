import styles from './assets/styles/common/Reset.module.css'

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import RecommendExercise from 'pages/recommend/exercise/RecommendExercise/RecommendExercise';
// import ExerciseRepeatsDay from 'pages/recommend/exercise/ExerciseRepeatsDay/ExerciseRepeatsDay';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className={styles.layout}>
            <RecommendExercise />
            {/* <ExerciseRepeatsDay/> */}
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
