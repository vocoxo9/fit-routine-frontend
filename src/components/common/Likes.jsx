import styles from './Likes.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";

/**
 * 좋아요를 나타내는 컴포넌트.
 *
 * @param count 좋아요 수
 * @param isLiked 좋아요를 눌렀는 지 여부
 * @param [onClick] 클릭 시 호출되는 함수 (선택)
 * @param [isBig] 큰 버전 여부 (선택)
 */
const Likes = (
    {
        count,
        isLiked,
        onClick,
        isBig
    }
) => {
    return <div className={`${styles.container} ${isBig && styles.big}`} onClick={onClick}>
        <span className={`${styles.count} ${isBig && styles.big}`}>
            {count}
        </span>
        <span className={`${styles.icon} ${isBig && styles.big}`}>
            <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart}/>
        </span>
    </div>
}

export default Likes;