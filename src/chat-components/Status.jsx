
const Status = ({ status }) => {

  return (
    <div className="typing-indicator-container">
      <p id="typing-indicator">
        {status}
      </p>
    </div>
  );
};

export default Status;// This component is used to show the typing indicator in the chat window.
// It will be displayed when the user is typing a message.