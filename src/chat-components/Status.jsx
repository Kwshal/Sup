import { useEffect, useState } from "react";
import { listenToUserStatus } from "../db"; 

const Status = ({ user }) => {
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    listenToUserStatus(user, (status) => {
      setStatusText(status);
    });
  }, [user]);
      console.log("statusText:", statusText);

  return (
    <div className={`status-indicator ${statusText}`}>
      <p className="status-text">
        {statusText}
      </p>
    </div>
  );
};

export default Status;// This component is used to show the typing indicator in the chat window.
// It will be displayed when the user is typing a message.