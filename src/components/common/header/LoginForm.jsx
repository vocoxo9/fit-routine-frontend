import styles from 'components/common/header/Header.module.css';

import { Link } from "react-router-dom";

export default function Login() {

    return (
        <div className={styles.headerRight}>
            <button className={styles.button}>로그인</button> <br />
            <Link to="#" >회원가입</Link>
        </div>
   );

};