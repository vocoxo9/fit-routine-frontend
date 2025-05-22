import Calculator from 'components/mainPage/Calculator';
import PopularPosts from 'components/mainPage/PopularPost';
import './MainPage.module.css';
import StretchingVideo from 'components/mainPage/StretchingVideo';

function MainPage () {
    return (
        <>
            <Calculator />
            <br/>
            <PopularPosts />
            <StretchingVideo />
        </>
    );
}

export default MainPage;