import styles from './assets/styles/common/Reset.module.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import MainPage from 'pages/main/MainPage/MainPage';
import SignUpForm from 'components/member/SignUpForm/SignUpForm';
import SignUpPage from 'pages/member/SignUpPage/SignUpPage';
import RecommendExercise from 'pages/recommend/exercise/RecommendExercise/RecommendExercise';
import RecommendForm from 'components/recommend/RecommendForm/RecommendForm';
import MyPage from 'pages/member/MyPage/MyPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <div className={styles.layout}>
                    <MainPage/>
                    <SignUpForm/>
                    <RecommendForm/>
                    <MyPage/>
                </div>

                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
