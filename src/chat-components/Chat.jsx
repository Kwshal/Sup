import { useState, useEffect, useRef } from "react";
import { saveMsgsToCloud, listenForMessages, listenToUserStatus } from "../db";
import leftArrow from "../assets/img/left-arrow.png";
import sendIcon from "../assets/img/send-icon.png";

let Chat = ({ friend, onBack }) => {
     const user = localStorage.getItem("user") || "Guest";
     const [messages, setMessages] = useState([]);
     const [inputValue, setInputValue] = useState("");
     const [status, setStatus] = useState("");
     const containerRef = useRef(null);

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
               // messagesSetter();
               // Save the message to the cloud
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
                    <button id="options" type="button" aria-label="Chat options">&#8942;</button>
               </div>

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
                         aria-label="Type a message"
                         value={inputValue}
                         onChange={e => setInputValue(e.target.value)}
                         onKeyDown={e => { if (e.key === "Enter") sendText(); }}
                    />
                    <button id="send" type="button" onClick={sendText} aria-label="Send message" disabled={!inputValue.trim()}>
                         <img src={sendIcon} alt="" />
                    </button>
               </div>
          </div>
     )
}

export default Chat;