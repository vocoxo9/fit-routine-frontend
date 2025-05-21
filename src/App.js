import styles from './assets/styles/common/Reset.module.css'

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import BoardDetail from 'pages/blogPage/boardDetailPage/BoardDetail';
import AllBoardsPage from 'pages/blogPage/allBoardsPage/AllBoardsPage';
import OnesBlogPage from 'pages/blogPage/onesBlogPage/OnesBlogPage';

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
