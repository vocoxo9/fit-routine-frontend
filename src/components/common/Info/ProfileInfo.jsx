import { TfiEmail } from 'react-icons/tfi';
import { FiUser } from 'react-icons/fi';
import { IoIosPhonePortrait } from 'react-icons/io';
import { BsCake2 } from 'react-icons/bs';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { LiaRulerVerticalSolid } from 'react-icons/lia';
import { IoScaleOutline } from 'react-icons/io5';

import styles from './ProfileInfo.module.css';
import InfoIcon from './InfoIcon/InfoIcon';

function ProfileInfo({ kind, text, info }) {

    return (
        <>
            <div className={styles.table}>
                <div className={styles.subTitle}>
                    <h4 className={styles.h4}>{text}</h4>
                </div>
                <div className={styles.info}>
                    <div className={styles.infoText}>
                        <InfoIcon kind={kind} />
                        <div className={styles.text}>|</div>
                        {info}
                        {kind === 'height' &&
                            <p className={styles.unit}>cm</p>
                        }
                        {kind === 'weight' &&
                            <p className={styles.unit}>kg</p>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;
