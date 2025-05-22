import styles from './assets/styles/common/Reset.module.css'

import {BrowserRouter} from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import BoardAddEditPage from 'pages/blog/BoardAddEditPage/BoardAddEditPage';
import BoardDetail from 'pages/blog/BoardDetailPage/BoardDetail';
import OnesBlogPage from 'pages/blog/OnesBlogPage/OnesBlogPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className={styles.layout}>
          <BoardAddEditPage/>
          <BoardDetail/>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
