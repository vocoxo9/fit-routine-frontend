import { FaUser, FaBell, FaRunning } from 'react-icons/fa';
import '../../assets/styles/common/Header.css';
import Login from '../../../components/common/header/Login';

export default function Header() {

    return (
        <>
            <div className="header">
                <div className="header left">
                    <div className="header left logo">
                        <a href="#">
                            {/* <i className="fa-solid fa-person-running"></i> */}
                            <FaRunning />
                            <span>FIT-ROUTINE</span>
                        </a>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li className="menu-item"> <a href="#">HOME</a> </li>
                        <li className="menu-item"> <a href="#">식단 추천</a> </li>
                        <li className="menu-item"> <a href="#">운동 추천</a> </li>
                        <li className="menu-item"><a href="#">Blog</a>
                            <ul className="submenu">
                                <li><a href="#">내 블로그</a></li>
                                <li><a href="#">내 TodoList</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <Login />
               {/* 로그인 전 
                <div className="header right">
                    <button>로그인</button> <br />
                    <a href="#">회원가입</a>
                </div> 
                */}
                {/* 로그인 후 
                <div className="header right">
                    <button>로그아웃</button> <br />
                    <a href="#"><FaUser className="header right icon" /></a>
                    <a href="#">
                        <FaBell className="header right icon" />
                        <span className="header right notification">3</span>
                    </a>
                </div>
                */}
            </div>
        </>

    );
};