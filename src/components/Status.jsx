import { useEffect, useState } from "react";
import { listenToUserStatus } from "../db";

const Status = ({ user }) => {
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    return listenToUserStatus(user, setStatusText);
  }, [user]);

  return (
    <div className={`status-indicator ${statusText === 'online' ? 'online' : ''}`}>
      <p className="status-text">
        {typeof statusText === 'number'? 'offline, '+
        new Date(statusText).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })
        : statusText === 'typing' ? 'Typing...'
        : statusText}
      </p>
    </div>
  );
};

export default Status;// This component is used to show the typing indicator in the chat window.
// It will be displayed when the user is typing a message.