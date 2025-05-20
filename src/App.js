import 'assets/styles/common/reset.css';

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import ExerciseRepeatsDay from 'pages/exercise/selectRepeatsDay/ExerciseRepeatsDay';
import ExerciseInputInfo from 'pages/exercise/inputInformation/ExerciseInputInfo';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className='layout'>
          <ExerciseInputInfo />
          <ExerciseRepeatsDay />
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
