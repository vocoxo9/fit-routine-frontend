import 'assets/styles/common/reset.css';

import { BrowserRouter } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
// import ExerciseInputInfo from 'pages/exercise/inputInformation/ExerciseInputInfo';
// import ExerciseRepeatsDay from 'pages/exercise/selectRepeatsDay/ExerciseRepeatsDay';
import SuggestRoutine from 'pages/exercise/suggestRoutine/SuggestRoutine';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <div className='layout'>
          {/* <ExerciseInputInfo /> */}
          {/* <ExerciseRepeatsDay /> */}
          <SuggestRoutine />
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
