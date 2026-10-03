import { useEffect, useState } from "react";
import { getAllUsers } from "../db";
import Sidebar from "./Sidebar"
import SearchBar from "./SearchBar"

// props to be passed to the component
let FriendsList = ({ onChatOpen }) => {
     const [users, setUsers] = useState([]);
     const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
               {/* <h2 className="user-list-header">Contacts</h2> */}
               <span className="girst">
                    <h2 className="logo">
                         Sup_
                         {/* <span className="user-count"> {users.length}</span> */}
                    </h2>
                    <button id="search-btn" type="button" onClick={() => setIsSearchBarOpen(true)}>
                         ⌕️
                    </button>
                    <button id="bergurMenu" type="button" onClick={() => setIsSidebarOpen(true)}>
                         &#9776;
                    </button>
               </span>
               {isSearchBarOpen && <SearchBar onBack={() => setIsSearchBarOpen(false)} />}
               {isSidebarOpen && <Sidebar onLogOut={() => { localStorage.removeItem('user'); window.location.reload(); }} onClose={() => setIsSidebarOpen(false)} />}
               <ul className="user-list-ul">
                    {users.map((user) => (
                         user.username !== localStorage.getItem("user") &&
                         <li key={user.key} onClick={onChatOpen} className="user-list-item">
                              <span className="avatar">{user.username ? user.username[0] : "?"}</span>
                              <span className="contact-info">
                                   <span className="name">{user.username || user.key}</span>
                                   <span className="status">{user.status}</span>
                              </span>
                         </li>
                    ))}
               </ul>
          </div>
     )
}


export default FriendsList;