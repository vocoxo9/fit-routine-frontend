import 'assets/styles/common/reset.css';

import { BrowserRouter } from 'react-router-dom';

import Header from 'pages/common/header/Header';
import ErrorPage from 'pages/common/errorPage/ErrorPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className='container'>

          
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
