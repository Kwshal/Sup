import Button from "../components/Button"
import ThemeColorPicker from "../components/ThemeColorPicker"

let Sidebar = ({ onLogOut, onClose }) => {

     const user = localStorage.getItem("user") || "Guest";

     function toggleTheme() {
          const root = document.documentElement;
          const current = root.getAttribute("data-theme");
          root.setAttribute("data-theme", current === "dark" ? "light" : "dark");
          localStorage.setItem("theme", current === "dark" ? "light" : "dark");
     }

     return (
          <div
               className="sidebar"
               onClick={e => {
                    if (e.target === e.currentTarget) onClose();
               }}
          >
               <div className="sidebar-main" role="dialog" aria-modal="true" aria-label="Menu">
                    <span className="avatar"> {user.charAt(0).toUpperCase()} </span>
                    <p>{user}</p>
                    <hr />

                    <Button id="toggle-theme" type="button" btnText="Toggle Theme" btnFunction={toggleTheme} />
                    <ThemeColorPicker />
                    <hr />
                    <Button id="logOutButton" type="button" btnText="Log Out" btnFunction={onLogOut} />
               </div>
          </div>
     )
}

export default Sidebar