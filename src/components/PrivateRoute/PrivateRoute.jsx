import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "utils/helpers/token";


function PrivateRoute() {
    const checkIsLoggedIn = isLoggedIn();

    if (!checkIsLoggedIn) {
        alert('로그인 후 이용 가능한 서비스입니다.');
    }

    return checkIsLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;

}

export default PrivateRoute;