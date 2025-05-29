import styles from './assets/styles/common/Reset.module.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import OnesTodoPage from 'pages/blog/OnesTodoPage/OnesTodoPage';
import BoardAddEditPage from 'pages/blog/BoardAddEditPage/BoardAddEditPage';
import BoardDetail from 'pages/blog/BoardDetailPage/BoardDetail';
import OnesBlogPage from 'pages/blog/OnesBlogPage/OnesBlogPage';
import AllBoardsPage from 'pages/blog/AllBoardsPage/AllBoardsPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <div className={styles.layout}>
                    <BoardDetail/>
                </div>

                <Footer />
            </BrowserRouter>
        </>
    );
}
export default App;
