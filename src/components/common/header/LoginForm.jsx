import styles from 'components/common/header/Header.module.css';

import { Link } from "react-router-dom";
import Button from '../button/Button';

export default function Login() {

    return (
        <div className={styles.headerRight}>
            {/* <button className={styles.button}>로그인</button> <br /> */}
            <Button size="logInOut" text="로그인"/>
            <Link to="#" ><p>회원가입</p></Link>
        </div>
   );

};