import reset from './assets/styles/common/Reset.module.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <div className={reset.layout}></div>

                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
