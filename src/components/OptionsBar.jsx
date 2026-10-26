import { useState } from "react";

function OptionsBar({ onClose, onClearChat }) {
     const [showOptions, setShowOptions] = useState(false);

     const handleShow = () => {
          setShowOptions(!showOptions);
     }
     const handleClose = () => {
          onClose();
     }

     return (
          <div className="options-bar">
               <div className={`options-bar-content ${showOptions ? "show" : ""}`}>
                    <button id="close" type="button" onClick={onClearChat} aria-label="Close">
                        clear chat &#10005;
                    </button>
                    <button id="close" type="button" onClick={handleClose} aria-label="Close">
                         &#10005;
                    </button>
               </div>
          </div>
     );
}

export default OptionsBar;