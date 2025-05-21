import styles from './assets/styles/common/Reset.module.css'

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import Input from 'components/common/input/Input';
import MainPage from 'pages/common/mainPage/MainPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className={styles.layout}>
          <MainPage />
          <Input size='title' type='text' id='title' name='title' placeHolder='제목을 입력하세요' maxLength={30} />
          {/* <Input size='content' type='text' id='title' name='title' placeHolder='내용을 입력하세요' maxLength={30} /> */}
          <Input size='long' type='password' id='pwd' name='pwd' placeHolder='비밀번호' />
          <Input size='long' type='text' id='pwd' error='머가요?' name='pwd' placeHolder='비밀번호' />
          <Input size='medium' type='text' id='pwd' name='pwd' placeHolder='비밀번호' />
          <Input size='short' type='text' id='pwd' name='pwd' placeHolder='비밀번호' />
          {/* <Input size='reply' type='text' id='pwd' name='pwd' placeHolder='비밀번호' />
          <Input size='secondReply' type='text' id='pwd' name='pwd' placeHolder='비밀번호' /> */}
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
