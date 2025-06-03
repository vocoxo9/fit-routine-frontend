import { RxCalendar } from 'react-icons/rx';
import { FaRegHeart } from 'react-icons/fa';
import { LuPencilLine } from 'react-icons/lu';
import { TbUsers } from 'react-icons/tb';

function NoticeIcon ({ category }) {
    let icon = '';
    if (category === 'todo') {
        icon = <RxCalendar />;
    } else if (category === 'like') {
        icon = <FaRegHeart />;
    } else if (category === 'reply') {
        icon = <LuPencilLine />;
    } else if (category === 'follow') {
        icon = <TbUsers />;
    }

    return (
        <>
            {icon}
        </>
    );
}

export default NoticeIcon;