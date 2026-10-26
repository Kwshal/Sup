import { useState, useEffect } from "react"
import { getAllUsers } from "../db";
import Status from "../components/Status";
import leftArrow from "../assets/img/left-arrow.png";

function SearchBar({ onBack, onChatOpen }) {
     const [searchText, setSearchText] = useState("");
     const [users, setUsers] = useState([]);

     useEffect(() => {
          getAllUsers()
               .then(data => {
                    if (data) {
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

     const normalizedSearch = searchText.trim().toLowerCase();
     const filteredUsers = users.filter(user =>
          normalizedSearch &&
          user?.username &&
          user.username !== localStorage.getItem("user") &&
          user.username.toLowerCase().includes(normalizedSearch)
     );

     return (
          <div className="search-bar">
               <div className="search-bar-container">
                    <button id="back-btn" type="button" onClick={onBack} aria-label="Back to chats">
                         <img src={leftArrow} alt="" />
                    </button>
                    <input
                         type="search"
                         id="search-input"
                         placeholder="Search users..."
                         aria-label="Search users"
                         value={searchText}
                         onChange={(e) => setSearchText(e.target.value)}
                    />
               </div>
               <ul className="user-list-ul">
                    {filteredUsers.length ? filteredUsers.map((user) => (
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
                              <span className="avatar">{user.username[0]}</span>
                              <span className="contact-info">
                                   <span className="name">{user.username}</span>
                                   <Status user={user.username} />
                              </span>
                              <span className="Add-Friend"></span>
                         </li>
                    )) : (
                         <li className="empty-list-message">
                              {normalizedSearch ? "No users match your search." : "Search for users to start chatting."}
                         </li>
                    )}
               </ul>
          </div>
     );
}
export default SearchBar;