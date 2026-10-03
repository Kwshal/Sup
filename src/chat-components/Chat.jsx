import { useState, useEffect, useRef } from "react";
import Button from "../components/Button"
import { saveMsgsToCloud, listenForMessages } from "../db";

let Chat = ({ contact, onBack }) => {
     const user = localStorage.getItem("user") || "Guest";
     const [messages, setMessages] = useState([]);
     const [inputValue, setInputValue] = useState("");
     const containerRef = useRef(null);

     function scrollToBottom() {
          const messagesContainer = document.querySelector(".chat-window-messages");
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
          messagesContainer.scrollBehavior = "smooth";

     }

     useEffect(() => {
          listenForMessages(user, contact, data => setMessages(Object.entries(data)));
     }, []);

     useEffect(() => {
          const el = containerRef.current;
          el.scrollTop = el.scrollHeight;
          // console.log("Messages updated, scrolling to bottom:", messages);
          // if (el) {
          //      // Check if content overflows
          //           console.log(el.scrollHeight > el.clientHeight);
          //      if (el.scrollHeight > el.clientHeight) {
          //           el.classList.add("overflowing"); // Align to top if content overflows
          //           el.classList.remove("not-overflowing");
          //      } else {
          //           el.classList.remove("overflowing"); // Align to bottom if content fits
          //           el.classList.add("not-overflowing");
          //      }
          // }
     }, [messages]);

     const sendText = () => {
          if (inputValue.trim() !== "") {
               saveMsgsToCloud(user, contact, inputValue);
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
                         {/* <span className="avatar">{contact ? contact[0] : "?"}</span> */}
                         {contact}
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