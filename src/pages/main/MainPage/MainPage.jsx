import Calculator from 'components/main/Calculator/Calculator';
import PopularPost from 'components/main/PopularPost/PopularPost';
import StretchingVideo from 'components/main/StretchingVideo/StretchingVideo';

import './MainPage.module.css';

function MainPage () {
    return (
        <>
            <Calculator />
            <br/>
            <PopularPost />
            <StretchingVideo />
        </>
    );
}

export default MainPage;