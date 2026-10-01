import {useEffect} from 'react';

let Status = ({typing, status}) => {
     useEffect(() => {
          let typingIndicator = document.querySelector('.typing-indicator');
          if (typing.length > 0) {
               typingIndicator.innerHTML = "Typing...";
          } else {
               typingIndicator.innerHTML = {status};
          }
     }, [typing]);
     return (
          <div className="typing-indicator-container">
               <p className='typing-indicator'>Typing...</p>
          </div>
     )
}

export default Status;
// This component is used to show the typing indicator in the chat window.
// It will be displayed when the user is typing a message.