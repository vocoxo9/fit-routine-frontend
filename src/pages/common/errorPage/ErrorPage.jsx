import { VscWarning } from "react-icons/vsc";
import "../errorPage/ErrorPage.css";
import 'assets/styles/common/reset.css';

export default function ErrorPage() {
    return (
        <div className="container">
            <div className="errorPage errorPage-main main-container">
                <div className="errorPage errorPage-main text">
                    잘못된 접근입니다.
                </div>
                <div className="errorPage errorPage-main warningIcon">
                   <VscWarning />
                </div>
                <div className="errorPage errorPage-main homeBtn"> 
                    <button id="moveMainPage">HOME</button> 
                </div>
            </div>
        </div>
    )
}