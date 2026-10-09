import { useState, useEffect } from "react"
import FriendsList from "./FriendsList"
import Chat from "./Chat"
import { setMyStatus } from "../db";

function ChatsPage({ onLogOut }) {
     const [isChatOpen, setIsChatOpen] = useState(false);
     const [contact, setContact] = useState("");

     const openChat = (e) => {
          let li = e.target.closest("li");
          if (li) {
               setContact(li.querySelector(".name").innerText);
               setIsChatOpen(true);
          }
     }
     useEffect(() => {
          setMyStatus(); // Set the user's status to online when the component mounts
     }, []);

     return (
          <div className="chat-page">
               {isChatOpen ? <Chat friend={contact} onBack={() => setIsChatOpen(false)} /> : <FriendsList onChatOpen={openChat} onLogOut={onLogOut} />}
          </div>
     )
}

export default ChatsPage;