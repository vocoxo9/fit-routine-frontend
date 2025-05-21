import 'assets/styles/common/Reset.css';

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import TodoPage from 'pages/blogPage/onesTodoPage/TodoPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className='layout'>

        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
