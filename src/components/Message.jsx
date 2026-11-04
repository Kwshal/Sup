
import { useState, useEffect, useRef } from "react";
import Emoji from "./Emoji";

const Message = ({ message, onDelete, editing, onEdit }) => {
     const [reacting, setReacting] = useState(false);
     const [deleting, setDeleting] = useState(false);
     const [actionsVisible, setActionsVisible] = useState(false);
     const messageRef = useRef(null);
     const doubleCount = (message.msg.match(/\p{Extended_Pictographic}/gu) || []).length;
     let bubbleSize;

     switch (message.msg.length - doubleCount) {
          case 1:
               bubbleSize = "biggest";
               break;
          case 2:
               bubbleSize = "bigger";
               break;
          case 3:
               bubbleSize = "big";
               break;
          default:
               bubbleSize = "";
     }
     function handleEdit() {
          onEdit();
     }
     function handleDelete() {
          setDeleting(true);
          console.log("Deleting message");
          setTimeout(onDelete, 450);
     }
     function handleActions() {
          setActionsVisible(!actionsVisible);
     }

     return (
          <li
               ref={messageRef}
               className={`${message.type} message ${deleting ? "deleting" : ""} ${actionsVisible ? "action-visible" : ""}`}
               onClick={handleActions}
          >
               {actionsVisible &&
                    <span className="message-actions-container">
                         <span className="actions">
                              <button className="copy-message" onClick={() => navigator.clipboard.writeText(message.msg)}>⧉</button>
                              <button className="react-btn" onClick={() => setReacting(!reacting)}>♡</button>
                              {message.type === "sent" &&
                                   <>
                                        <button className="delete-message" onClick={handleDelete}>Delete</button>
                                        <button className="edit-message" onClick={handleEdit}>Edit</button>
                                   </>
                              }
                         </span>
                    </span>
               }
               <span className={`message-text ${bubbleSize} ${editing} ${message.edited ? "Edited" : ""} ${message.read ? "read" : "unread"}`}>
                    {editing && <span className="message-status">Editing...</span>}
                    {!editing && <span className="message-status">
                         {message.edited && "Edited "}
                         {/* {message.edited && message.msg.length > 12 && " • "} */}
                    </span>}
                    <span className="msg">
                         {message.msg}
                    </span>
                    {actionsVisible && <span className={`timestamp ${message.msg.length <= 12 && "outside"}`}>
                         {new Date(message.timestamp).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true
                         })}
                    </span>}
               </span>
          </li>
     );
}

export default Message;