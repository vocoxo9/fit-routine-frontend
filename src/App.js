import styles from './assets/styles/common/Reset.module.css';

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import RecommendExercise from 'pages/recommend/exercise/RecommendExercise/RecommendExercise';
import ExerciseInputInfo from 'pages/recommend/exercise/ExerciseInputInfo/ExerciseInputInfo';
import ExerciseRepeatsDay from 'pages/recommend/exercise/ExerciseRepeatsDay/ExerciseRepeatsDay';
// import ExerciseRepeatsDay from 'pages/recommend/exercise/ExerciseRepeatsDay/ExerciseRepeatsDay';

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
