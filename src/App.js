import styles from './assets/styles/common/Reset.module.css'

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import MyPage from 'pages/member/MyPage/MyPage';
import MyPageForm from 'components/member/mypage/MyPageForm';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className={styles.layout}>
          <MyPage>
            <MyPageForm/>
          </MyPage>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
