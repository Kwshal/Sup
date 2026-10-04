import { useState, useEffect, useRef } from "react";
import Button from "../components/Button"
import { saveMsgsToCloud, listenForMessages, listenToUserStatus } from "../db";

let Chat = ({ friend, onBack }) => {
     const user = localStorage.getItem("user") || "Guest";
     const [messages, setMessages] = useState([]);
     const [inputValue, setInputValue] = useState("");
     const [status, setStatus] = useState("");
     const containerRef = useRef(null);

     function scrollToBottom() {
          const messagesContainer = document.querySelector(".chat-window-messages");
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
          messagesContainer.scrollBehavior = "smooth";

     }

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
     }, [friend]);
     const sendText = () => {
          if (inputValue.trim() !== "") {
               saveMsgsToCloud(user, friend, inputValue);
               setInputValue("");
               // messagesSetter();
               // Save the message to the cloud
          }
     }

     return (
          <div className="chat-window">
               <div className="chat-window-header">
                    <Button id="back" type="button" btnText="&#8249;" btnFunction={onBack} />
                    <h1 className="name">
                         {/* <span className="avatar">{friend ? friend[0] : "?"}</span> */}
                         {friend}
                         <span className="status">{status}</span>
                    </h1>
                    <Button id="options" type="button" btnText="&#8942;" />
                    {/* <hr /> */}
               </div>

               {/* main content ie messages */}
               <div className="chat-window-content">
                    <div ref={containerRef} className="chat-window-messages">
                         {messages.map(([uniqueKey, text]) => (
                              <p className={text.type === "received" ? "received message" : "sent message"} key={uniqueKey}>{text.msg} <span className="timestamp">{text.timestamp}</span></p>
                         ))}
                    </div>
               </div>

               <div className="chat-window-input">
                    <input
                         type="text"
                         placeholder="Type a message..."
                         value={inputValue}
                         onChange={e => setInputValue(e.target.value)}
                         onKeyDown={e => { if (e.key === "Enter") sendText(); }}
                    />
                    <button id="send" type="button" onClick={sendText}><img src="./src/assets/img/send-icon.png" alt="Send" /></button>
               </div>
          </div>
     )
}

export default Chat;