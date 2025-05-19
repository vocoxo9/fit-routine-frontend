import { FaUser, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Logout() {

    return (
        <div className="header right">
            <button>로그아웃</button> <br />
            <Link to="#"><FaUser className="header right icon" /></Link>
            <Link to="#">
                <FaBell className="header right icon" />
                <span className="header right notification">3</span>
            </Link>
        </div>
    );

};