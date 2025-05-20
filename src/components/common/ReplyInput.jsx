import Input from "./Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import '../css/replyInput.css';

function ReplyInput({size}) {
    const icon = size == 'first' ? '3x' : '2x';
    const input = size == 'first' ? 'reply' : 'secondReply';

    return (
        <div className={`comment ${size}`}  >
            <div>
                <Input type='text' size={input} />
            </div>
            <div className={`sendBtn ${size}`} >
                <FontAwesomeIcon icon={faPaperPlane} color="#334EAC" size={icon} />
            </div>
        </div>
    );
}

export default ReplyInput;