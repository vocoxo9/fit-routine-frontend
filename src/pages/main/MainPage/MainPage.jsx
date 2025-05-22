import Calculator from 'components/main/Calculator/Calculator';
import PopularPosts from 'components/main/PopularPost/PopularPost';
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