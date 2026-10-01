import { useState } from "react"
import Sidebar from "./Sidebar"
import FriendsList from "./FriendsList"
import Chat from "./Chat"
// import ChatHeader from "./ChatHeader"

function ChatsPage({ onLogOut }) {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [isChatOpen, setIsChatOpen] = useState(false);
     const [contact, setContact] = useState("");

     const openChat = (e) => {
          if (e.target.tagName === "LI") {
               setContact(e.target.querySelector(".name").innerText);
          } else {
               // If the click is on the avatar or name span, get the parent LI
               setContact(e.target.parentElement.querySelector(".name").innerText);
          }
          setIsChatOpen(true);
     }

     return (
          <div className="chat-page">
               {isSidebarOpen && <Sidebar onLogOut={onLogOut} onClose={() => setIsSidebarOpen(false)} />}
               {isChatOpen ? <Chat contact={contact} onBack={() => setIsChatOpen(false)} /> : <FriendsList onChatOpen={openChat} onSidebarOpen={() => setIsSidebarOpen(true)}/>}
          </div>
     )
}

export default ChatsPage;