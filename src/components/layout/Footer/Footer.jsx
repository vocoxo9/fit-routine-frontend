import styles from 'components/layout/Footer/Footer.module.css';

import Logo from 'components/layout/Logo/Logo';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.item1}>
                <h2>KH 정보교육원 Final 팀 프로젝트</h2>
                <p>팀명 : Basic</p>
                <p>
                    <Link to="https://github.com/basic-stack">
                        프로젝트명 : Fit-Routine
                    </Link>
                </p>
            </div>
            <div className={styles.item2}>
                <h2>Introduce Team</h2>
                <p>
                    <Link to="https://github.com/Kim-ilhyeon">
                        팀장 : 김일현
                    </Link>
                </p>
                <p>
                    <Link to="https://github.com/Tokemo">
                        형상관리 : 안민영
                    </Link>
                </p>
                <p>
                    <Link to="https://github.com/seongjae213">
                        DB관리 : 유성재
                    </Link>
                </p>
                <p>
                    <Link to="https://github.com/vocoxo9">
                        이슈관리 : 정혜영
                    </Link>
                </p>
            </div>
            <div className={styles.item3}>
                <table>
                    <tbody>
                        <tr>
                            <th>Tool</th>
                            <td>VS Code</td>
                            <td>IntelliJ</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Library</th>
                            <td>React</td>
                            <td>Lombok</td>
                        </tr>
                        <tr>
                            <th>Tech stack</th>
                            <td>HTML</td>
                            <td>CSS</td>
                            <td>Java</td>
                        </tr>
                        <tr>
                            <th>Framework</th>
                            <td>MyBatis</td>
                            <td>Spring</td>
                        </tr>
                        <tr>
                            <th>DB</th>
                            <td>Oracle DB</td>
                        </tr>
                        <tr>
                            <th>API</th>
                            <td>Google</td>
                            <td>Apple</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.item4}>
                <Logo />
                <p>문의 메일 : basic-team@com.kh</p>
            </div>
        </div>
    );
}
