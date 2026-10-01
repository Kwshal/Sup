import { useEffect, useState } from "react";
import Button from "../components/Button";
import { getAllUsers, } from "../db";


// props to be passed to the component
let FriendsList = ({ onSidebarOpen, onChatOpen }) => {
     const [users, setUsers] = useState([]);

     // useEffect(() => {


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
                    {/* <h4>This is a chat app</h4> */}
                    <button id="bergurMenu" type="button" onClick={onSidebarOpen} aria-label="Open menu">
                         &#9776;
                    </button>
               </span>
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