import './css/AddChatButton.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';

const AddChat = () => {
    return (
        <button class="add-chat">
            <FontAwesomeIcon icon={faCommentMedical}/>
        </button>
    );
}
 
export default AddChat;