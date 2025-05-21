import Calculator from 'components/mainPage/Calculator';
import PopularPosts from 'components/mainPage/PopularPost';
import './MainPage.module.css';

function MainPage () {
    return (
        <>
            <Calculator />
            <br/>
            <PopularPosts />
        </>
    );
}

export default MainPage;