import styles from './assets/styles/common/Reset.module.css'

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import AllBoardsPage from 'pages/blog/AllBoardsPage/AllBoardsPage';
import BoardDetail from 'pages/blog/BoardDetailPage/BoardDetail';
import FormContainer from 'components/common/FormContainer/FormContainer';
import LikeList from 'components/member/mypage/likeList/LikeList';
import Profile from 'components/member/mypage/profile/Profile';
import OnesBlogPage from 'pages/blog/OnesBlogPage/OnesBlogPage';
import OnesTodoPage from 'pages/blog/OnesTodoPage/OnesTodoPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className={styles.layout}>
          <OnesTodoPage/>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
