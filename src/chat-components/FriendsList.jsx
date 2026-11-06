import { useEffect, useState } from "react";
import { getAllUsers, getAllFriends } from "../db";
import Sidebar from "./Sidebar"
import SearchBar from "./SearchBar"
import FriendLi from "./Friend-li"
import Features from "./AI"

// props to be passed to the component
let FriendsList = ({ onChatOpen, onLogOut }) => {
     const [users, setUsers] = useState([]);
     const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
     const currentUser = localStorage.getItem("user") || "Guest";

     useEffect(() => {
          getAllUsers()
               .then(data => {
                    // console.log("Fetched users data:", data);
                    if (data) {
                         // Convert object to array
                         return Object.entries(data).map(([key, value]) => ({
                              key,
                              ...value
                         }));
                    }
               }).then(usersArray => {
                    getAllFriends(currentUser)
                         .then(friendsData => {   
                              const friends = usersArray.filter(user => Object.keys(friendsData || {}).includes(user.username));
                              setUsers(friends);
                         })
               })
               .catch(() => setUsers([]));
     }, []);

     return (
          <div className="user-list-container">
               <header className="chat-list-header">
                    <h2 className="logo">
                         Sup
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
               {/* <h3 className="friends">Friends</h3> */}
               <ul className="user-list-ul">
                    {users.length === 0 ? <li className="user-list-item no-friends">You don't have any friends<button onClick={() => setIsSearchBarOpen(true)}>Make Friends</button></li> : users.map((user) => (
                         user && user.username && user.username !== localStorage.getItem("user") && (
                              <FriendLi
                                   key={user.key}
                                   user={user}
                                   onChatOpen={onChatOpen}
                              />
                         )
                    ))}
               </ul>
               <button
                    id="features-btn"
                    type="button"
                    // onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                    aria-label={isFeaturesOpen ? "Close feature suggestions" : "Open feature suggestions"}
                    aria-expanded={isFeaturesOpen}
               >
                    {isFeaturesOpen ? "✖" : "AI"}
               </button>
               {isFeaturesOpen && <Features onClose={() => setIsFeaturesOpen(false)} />}
          </div>
     )
}


export default FriendsList;