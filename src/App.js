import styles from './assets/styles/common/Reset.module.css'

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

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
