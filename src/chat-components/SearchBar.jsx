import { useState } from "react"
import { getAllUsers } from "../db";

function SearchBar({ onBack }) {
     const [name, setName] = useState("");
     const user = localStorage.getItem("user") || "Guest";

     return (
          <div className="search-bar">
               <button id="back" type="button" onClick={onBack}>&#8249;</button>
               <input
                    type="text"
                    id="search-input"
                    placeholder="Search for a friend..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
               />
          </div>
     );
}
export default SearchBar;