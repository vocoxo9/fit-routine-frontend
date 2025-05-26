import styles from './GenderImage.module.css';
import { VscAccount } from 'react-icons/vsc';

/**
 * 성별 이미지 컴포넌트
 *
 * @param {string} gender - 성별 (male, female)
 */
export default function GenderImage(
    {
        gender,
    },
) {

    return (
        <div className={`${styles[gender]}`}>
            <VscAccount />
        </div>
    );
}