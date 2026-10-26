import { useState, useEffect, useRef } from "react";
import {
     saveMsgsToCloud,
     listenForMessages,
     listenToUserStatus,
     deleteMsg,
     editMsg,
     clearChat
} from "../db";
import leftArrow from "../assets/img/left-arrow.png";
import sendIcon from "../assets/img/send-icon.png";
import OptionsBar from "../components/OptionsBar";
import Message from "../components/Message";

let Chat = ({ friend, onBack }) => {
     const user = localStorage.getItem("user") || "Guest";
     const [messages, setMessages] = useState([]);
     const [inputValue, setInputValue] = useState("");
     const [status, setStatus] = useState("");
     const containerRef = useRef(null);
     const inputRef = useRef(null);
     const [editing, setEditing] = useState(false);
     const [isOptionsOpen, setIsOptionsOpen] = useState(false);
     const [msgId, setMsgId] = useState(null);
     const [originalMsg, setOriginalMsg] = useState("");

     useEffect(() => {
          const update = () => {
               document.documentElement.style.setProperty(
                    "--viewport-height",
                    `${window.visualViewport?.height ?? window.innerHeight}px`
               );
          };

          window.visualViewport?.addEventListener("resize", update);
          window.addEventListener("resize", update);
          update();

          return () => {
               window.visualViewport?.removeEventListener("resize", update);
               window.removeEventListener("resize", update);
          };
     }, []);

     useEffect(() => {
          const messagesContainer = containerRef.current;
          messagesContainer?.scrollTo({
               top: messagesContainer.scrollHeight,
               behavior: "smooth"
          });
     }, [messages]);

     useEffect(() => {
          const unsubscribeMessages = listenForMessages(
               user,
               friend,
               data => setMessages(Object.entries(data))
          );

          const unsubscribeStatus = listenToUserStatus(
               friend,
               status => setStatus(status)
          );

          return () => {
               unsubscribeMessages();
               unsubscribeStatus();
          };
     }, [friend, user]);
     const sendText = () => {
          if (inputValue.trim() !== "") {
               saveMsgsToCloud(user, friend, inputValue);
               setInputValue("");
               inputRef.current.focus();
               // messagesSetter();
               // Save the message to the cloud
          }
     }

     function handleEdit(msg, key) {
          setEditing(true);
          setInputValue(msg);
          inputRef.current.focus();
          setMsgId(key);
          setOriginalMsg(msg);
     }

     function editText() {
          if (inputValue.trim() !== "") {
               editMsg(user, friend, originalMsg, msgId, inputValue);
               setEditing(false);
               setInputValue("");
               setMsgId(null);
               setOriginalMsg("");
          }
     }

     return (
          <div className="chat-window">
               <div className="chat-window-header">
                    <button id="back" type="button" onClick={onBack} aria-label="Back to chats">
                         <img src={leftArrow} alt="" />
                    </button>
                    <div className="chat-contact">
                         <span className="avatar">{friend?.charAt(0) || "?"}</span>
                         <div className="chat-contact-details">
                              <h2 className="chat-contact-name">{friend}</h2>
                              <span className={`chat-contact-status ${status}`}>{status || "offline"}</span>
                         </div>
                    </div>
                    <button id="options" type="button" onClick={() => setIsOptionsOpen(true)} aria-label="Chat options">&#8942;</button>
                    {isOptionsOpen && <OptionsBar onClose={() => setIsOptionsOpen(false)} onClearChat={() => clearChat(user, friend)} />}
               </div>

               <div className="chat-window-content">
                    <ul ref={containerRef} className="chat-window-messages">
                         {messages.map(([key, text]) => {
                              return (
                                   <Message
                                        key={key}
                                        message={text}
                                        onDelete={() => deleteMsg(user, friend, key)}
                                        editing={key === msgId ? 'editing' : ''}
                                        onEdit={() => handleEdit(text.msg, key)}
                                   />
                              );
                         })}
                         {
                              messages.length === 0 &&
                              <li className="empty-list-message">
                                   <span>No messages yet</span>
                              </li>
                         }
                    </ul>
               </div>

               <div className="chat-window-input">
                    <input
                         ref={inputRef}
                         type="text"
                         placeholder="Type a message..."
                         aria-label="Type a message"
                         value={inputValue}
                         onChange={e => setInputValue(e.target.value)}
                    />
                    <button id="send" type="button" onClick={ editing ? editText : sendText } aria-label="Send message">
                         {editing ? "✔" : <img src={sendIcon} alt="" />}
                    </button>
               </div>
          </div>
     )
}

export default Chat;