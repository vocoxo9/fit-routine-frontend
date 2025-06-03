import styles from './assets/styles/common/Reset.module.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import ExerciseInputInfo from 'pages/recommend/exercise/ExerciseInputInfo/ExerciseInputInfo';
import SignUpForm from 'components/member/SignUpForm/SignUpForm';
import OnesBlogPage from 'pages/blog/OnesBlogPage/OnesBlogPage';
import BoardAddEditPage from 'pages/blog/BoardAddEditPage/BoardAddEditPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <div className={styles.layout}>
                    <BoardAddEditPage/>
                </div>

                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
