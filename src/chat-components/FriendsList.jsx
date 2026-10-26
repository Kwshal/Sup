import { useEffect, useState } from "react";
import { getAllUsers } from "../db";
import Sidebar from "./Sidebar"
import SearchBar from "./SearchBar"
import Status from "../components/Status"
import Features from "./Features"

// props to be passed to the component
let FriendsList = ({ onChatOpen,onLogOut }) => {
     const [users, setUsers] = useState([]);
     const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

     useEffect(() => {
          getAllUsers()
               .then(data => {
                    // console.log("Fetched users data:", data);
                    if (data) {
                         // Convert object to array
                         const usersArray = Object.entries(data).map(([key, value]) => ({
                              key,
                              ...value
                         }));
                         setUsers(usersArray);
                    } else {
                         setUsers([]);
                    }
               })
               .catch(() => setUsers([]));
     }, []);

     return (
          <div className="user-list-container">
               <header className="chat-list-header">
                    <h2 className="logo">
                         Sup_
                    </h2>
                    <button id="search-btn" type="button" onClick={() => setIsSearchBarOpen(true)} aria-label="Search users">
                         ⌕️
                    </button>
                    <button id="bergurMenu" type="button" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
                         &#9776;
                    </button>
               </header>
               {isSearchBarOpen && <SearchBar onBack={() => setIsSearchBarOpen(false)} onChatOpen={onChatOpen} />}
               {isSidebarOpen && <Sidebar onLogOut={onLogOut} onClose={() => setIsSidebarOpen(false)} />}
               <h3 className="friends">Friends</h3>
               <ul className="user-list-ul">
                    {users.map((user) => (
                         user && user.username && user.username !== localStorage.getItem("user") &&
                         <li
                              key={user.key}
                              onClick={onChatOpen}
                              onKeyDown={e => {
                                   if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        onChatOpen(e);
                                   }
                              }}
                              className="user-list-item"
                              role="button"
                              tabIndex={0}
                         >
                              <span className="avatar">{user.username ? user.username[0] : "?"}</span>
                              <span className="contact-info">
                                   <span className="name">{user.username || user.key}</span>
                                   <Status user={user.username} />
                              </span>
                         </li>
                    ))}
               </ul>
               <button
                    id="features-btn"
                    type="button"
                    onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                    aria-label={isFeaturesOpen ? "Close feature suggestions" : "Open feature suggestions"}
                    aria-expanded={isFeaturesOpen}
               >
                    {isFeaturesOpen ? "✖" : "🍀"}
               </button>
               {isFeaturesOpen && <Features onClose={() => setIsFeaturesOpen(false)} />}
          </div>
     )
}


export default FriendsList;