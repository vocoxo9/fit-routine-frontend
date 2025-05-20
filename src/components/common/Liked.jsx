import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import '../css/Liked.css';

function Liked ({size}) {
    const heart = size == 'big' ? '2x' : '';

    return (
        <div className={`liked ${size}`}>
            <div className={`count ${size}`}>
                81
            </div>
            <div>
            <FontAwesomeIcon icon={farHeart} color='red' size={heart} />
            {/* 속이 채워진 아이콘은 reqular말고 solid 스타일의 아이콘을 사용해야됨 */}
            </div>
        </div>
    );
}

export default Liked;