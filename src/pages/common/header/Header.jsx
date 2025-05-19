import { FaUser, FaBell, FaRunning } from 'react-icons/fa';
import 'pages/common/header/Header.css';

import Login from 'components/common/header/Login';
import Logout from 'components/common/header/Logout';

import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <>
            <div className="header">
                <div className="header left">
                    <div className="header left logo">
                        <Link to="#">
                            <FaRunning />
                            <span>FIT-ROUTINE</span>
                        </Link>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li className="menu-item"> <Link to="#">HOME</Link> </li>
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