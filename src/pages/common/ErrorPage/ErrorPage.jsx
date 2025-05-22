import {VscWarning} from "react-icons/vsc";
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
    return (
            <div className={styles.mainContainer}>
                <div className={styles.text}>
                    잘못된 접근입니다.
                </div>
                <div className={styles.warningIcon}>
                   <VscWarning />
                </div>
                <div> 
                    <button className={styles.homeBtn} id="moveMainPage">HOME</button> 
                </div>
            </div>
    )
}