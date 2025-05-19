import 'assets/styles/common/reset.css';
import Header from 'pages/common/header/Header';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>

        <Header />

        <div className='container'>
          {/* hello
          <div style={{border: 'solid 1px red', width: '2rem', height: '3rem'}}>
          
          </div> */}
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
