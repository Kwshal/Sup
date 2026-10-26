import { useState } from "react";

const Emoji = ({ emoji, onClick }) => {
     const [selected, setSelected] = useState(false);

     function handleClick() {
          onClick();
          setSelected(!selected);
     }

     return (
          <span className={`emoji ${selected ? "selected" : ""}`} onClick={handleClick}>
               {emoji}
          </span>
     );
}

export default Emoji;