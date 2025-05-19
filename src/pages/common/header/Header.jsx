import { FaUser, FaBell, FaRunning } from 'react-icons/fa';
import 'assets/styles/common/Header.css';

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
                            {/* <i className="fa-solid fa-person-running"></i> */}
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
                        <li className="menu-item"><Link to="#">Blog</Link>
                            <ul className="submenu">
                                <li><Link to="#">내 블로그</Link></li>
                                <li><Link to="#">내 TodoList</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                {/* <Login /> */}
                <Logout />

               {/* 로그인 전 
                <div className="header right">
                    <button>로그인</button> <br />
                    <Link to="#">회원가입</Link>
                </div> */}

                {/* 로그인 후 
                <div className="header right">
                    <button>로그아웃</button> <br />
                    <Link to="#"><FaUser className="header right icon" /></Link>
                    <Link to="#">
                        <FaBell className="header right icon" />
                        <span className="header right notification">3</span>
                    </Link>
                </div>
                */}
            </div>
        </>

    );
};