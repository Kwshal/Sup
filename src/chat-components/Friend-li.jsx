import { useState, useEffect } from "react";
import Status from "../components/Status"
import { getUnreadMsgsCount, listenForMessages } from "../db";


function FriendLi({ user, onChatOpen}) {
     const [unreadCount, setUnreadCount] = useState(0);
     const [messages, setMessages] = useState([]);
     const currentUser = localStorage.getItem("user") || "Guest";

     useEffect(() => {
          const unsubscribeMessages = listenForMessages(
               currentUser,
               user.username,
               data => setMessages(Object.entries(data))
          );
          return unsubscribeMessages;
     }, [user.username]);

     useEffect(() => {
          const fetchUnreadCounts = async () => {
                    const count = await getUnreadMsgsCount(user.username);
                    setUnreadCount(count);
          }
          fetchUnreadCounts();
     }, [messages, user.username]);

     return (
          <li
               key={user.key}
               onClick={onChatOpen}
               className="user-list-item"
          >
               <span className="avatar">{user.username ? user.username[0] : "?"} </span>
               <span className="contact-info">
                    <span className="name">{user.username || user.key}</span>
                    <span className="message-info">
                         <Status user={user.username} />
                         {unreadCount > 0 && <span className="unread-count"> • <span id="count">{unreadCount}</span> new {unreadCount > 1 ? 'messages' : 'message'}</span>}
                    </span>
               </span>
          </li >
     );
}

export default FriendLi;