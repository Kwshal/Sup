import { useState, useEffect } from "react"
import { getAllUsers } from "../db";

function SearchBar({ onBack }) {
     const [searchText, setSearchText] = useState("");
     const [users, setUsers] = useState([]);

     useEffect(() => {
          getAllUsers()
               .then(data => {
                    // console.log("Fetched users data:", data);
                    if (data) {
                         // Convert object to array
                         const usersArray = Object.keys(data);
                         setUsers(usersArray);
                    } else {
                         setUsers([]);
                    }
               })
               .catch(() => setUsers([]));
     }, []);

     return (
          <div className="search-bar">
               <div className="search-bar-container">
               <button id="back-btn" type="button" onClick={onBack}>&#8249;</button>
               <input
                    type="text"
                    id="search-input"
                    placeholder="Search for a friend..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
               />
               </div>
               <ul className="user-list-ul">
                    {users.map((user) => (
                         user && user.username && user.username !== localStorage.getItem("user") &&
                         <li key={user.key} onClick={onChatOpen} className="user-list-item">
                              <span className="avatar">{user.username ? user.username[0] : "?"}</span>
                              <span className="contact-info">
                                   <span className="name">{user.username || user.key}</span>
                                   <Status user={user.username} />
                              </span>
                         </li>
                    ))}
                    <li className="user-list-item">hiii</li>
               </ul>
          </div>
     );
}
export default SearchBar;