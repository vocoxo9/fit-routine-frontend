import styles from './assets/styles/common/Reset.module.css'

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';


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
