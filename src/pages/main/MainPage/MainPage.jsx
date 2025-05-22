import Calculator from 'components/main/Calculator/Calculator';
import PopularPost from 'components/main/PopularPost/PopularPost';
import StretchingVideo from 'components/main/StretchingVideo/StretchingVideo';
import RoutineMvp from 'components/main/RoutineMvp/RoutineMvp';

import './MainPage.module.css';

function MainPage() {
    return (
        <>
            <Calculator />
            <PopularPost />
            <StretchingVideo />
            <RoutineMvp />
        </>
    );
}

export default MainPage;