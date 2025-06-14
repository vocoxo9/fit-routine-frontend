import styles from './assets/styles/common/Reset.module.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import MainPage from 'pages/main/MainPage/MainPage';
import SignUpPage from 'pages/member/SignUpPage/SignUpPage';
import AllBoardsPage from 'pages/blog/AllBoardsPage/AllBoardsPage';
import OnesBlogPage from 'pages/blog/OnesBlogPage/OnesBlogPage';
import OnesTodoPage from 'pages/blog/OnesTodoPage/OnesTodoPage';
import MyPage from 'pages/member/MyPage/MyPage';
import ExerciseInputInfo from 'pages/recommend/exercise/ExerciseInputInfo/ExerciseInputInfo';
import ReSign from 'components/member/mypage/ReSign/ReSign';
import BoardAddEditPage from 'pages/blog/BoardAddEditPage/BoardAddEditPage';
import BoardDetail from 'pages/blog/BoardDetailPage/BoardDetail';
import AllExercisePages from 'pages/recommend/exercise/AllExercisePages';
import LoginPage from './pages/member/LoginPage/LoginPage';
import WelcomePage from './pages/member/WelcomePage/WelcomePage';
import ErrorPage from './pages/main/ErrorPage/ErrorPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <div className={styles.layout}>
                    <Routes>
                        <Route path={"/"} element={<MainPage/>} />
                        <Route path={"/login"} element={<LoginPage/>} />
                        <Route path={"/welcome"} element={<WelcomePage/>} />
                        <Route path={"/signup"} element={<SignUpPage/>} />
                        <Route path={"/error"} element={<ErrorPage/>} />
                        <Route path={"/mypage"} element={<MyPage/>} />
                        <Route path={"/resign"} element={<ReSign/>} />
                        <Route path={"/board"} element={<AllBoardsPage/>} />
                        <Route path={"/blog/:blogId"} element={<OnesBlogPage/>} />
                        <Route path={"/todo"} element={<OnesTodoPage/>} />
                        <Route path={"/board/add"} element={<BoardAddEditPage buttonText='등록'/>} />
                        <Route path={"/board/edit/:boardId"} element={<BoardAddEditPage buttonText='수정'/>} />
                        <Route path={"/board/detail/:boardId"} element={<BoardDetail/>} />
                        <Route path={"/exercise/:todoId"} element={<AllExercisePages/>} />
                        <Route path={"/food"} element={<ExerciseInputInfo/>} />
                    </Routes>
                </div>

                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
