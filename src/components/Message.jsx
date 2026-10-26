
import { useState, useEffect, useRef } from "react";
import Emoji from "./Emoji";

const Message = ({ message, onDelete, editing, onEdit }) => {
     const [reacting, setReacting] = useState(false);
     const [deleting, setDeleting] = useState(false);
     const [actionsVisible, setActionsVisible] = useState(false);
     const messageRef = useRef(null);

     function handleEdit() {
          onEdit();
     }
     function handleDelete() {
          setDeleting(true);
          console.log("Deleting message");
          setTimeout(onDelete, 1000);
     }

     return (
          <li ref={messageRef} className={`${message.type} message ${deleting ? "deleting" : ""}`}>
               <span className="message-info">
                    <span className="timestamp">
                         {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
               </span>
               {message.type === 'sent' &&
                    <span className="message-actions-container">
                         <span className="actions">
                              <button className="delete-message" onClick={handleDelete}>Delete</button>|
                              <button className="copy-message" onClick={() => navigator.clipboard.writeText(message.msg)}>Copy</button>|
                              <button className="edit-message" onClick={handleEdit}>Edit</button>
                         </span>
                    </span>
               }
               <span className={`message-text ${editing} ${message.edited ? "edited" : ""}`}>
                    <span className="message-status">
                         {message.edited && "Edited"}
                    </span>
                    <span className="msg">
                         {message.msg}
                    </span>
               </span>
          </li>
     );
}

export default Message;