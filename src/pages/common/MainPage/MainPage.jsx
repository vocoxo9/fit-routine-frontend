import Calculator from 'components/main/Calculator/Calculator';
import PopularPosts from 'components/main/PopularPost/PopularPost';
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