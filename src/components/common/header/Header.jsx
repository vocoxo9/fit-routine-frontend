import 'components/common/header/Header.css';

import Login from 'components/common/header/LoginForm';
import Logout from 'components/common/header/LogoutForm';

import { Link } from 'react-router-dom';
import Logo from 'components/common/header/Logo';

export default function Header() {

    return (
        <>
            <div className="header">
                <div className="header left">
                    <Logo />
                </div>
                <nav>
                    <ul>
                        <li className="menu-item"> <Link to="/">HOME</Link> </li>
                        <li className="menu-item"> <Link to="#">식단 추천</Link> </li>
                        <li className="menu-item"> <Link to="#">운동 추천</Link> </li>
                        <li className="menu-item"> <Link to="#">Blog</Link>
                            <ul className="submenu">
                                <li> <Link to="#">내 블로그</Link> </li>
                                <li> <Link to="#">내 TodoList</Link> </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                <Login />
                {/* <Logout /> */}
            </div>
        </>

    );
};