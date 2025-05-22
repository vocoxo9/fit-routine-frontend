import { TfiEmail } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { IoIosPhonePortrait } from "react-icons/io";
import { BsCake2 } from "react-icons/bs";
import { BsGenderAmbiguous } from "react-icons/bs";
import { LiaRulerVerticalSolid } from "react-icons/lia";
import { IoScaleOutline } from "react-icons/io5";

import styles from './ProfileInfo.module.css';

function ProFileInfo({ kind, text, info }) {
    let icon;

    switch (kind) {
        case 'email':
            icon = <TfiEmail size="1.32rem" />;
            break;
        case 'nickName':
            icon = <FiUser size="1.32rem" />;
            break;
        case 'birth':
            icon = <BsCake2 size="1.32rem" />;
            break;
        case 'phone':
            icon = <IoIosPhonePortrait size="1.32rem" />;
            break;
        case 'gender':
            icon = <BsGenderAmbiguous size="1.32rem" />;
            break;
        case 'height':
            icon = <LiaRulerVerticalSolid size="1.32rem" />;
            break;
        case 'weight':
            icon = <IoScaleOutline size="1.32rem" />;
            break;
        default:
            icon = null;
    }

    return (
        <>
            <div className={styles.table}>
                <div className={styles.subTitle}>
                    <h4 className={styles.h4}>
                        {text}
                    </h4>
                </div>
                <div className={styles.info} >
                    <div className={styles.infoText}>
                        {icon}
                        <div className={styles.text}>
                            |
                        </div>
                        {info}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProFileInfo;