import { useState, useEffect } from "react";

function ThemeColorPicker() {
     const [baseColor, setBaseColor] = useState(localStorage.getItem("baseColor") || "#4d8b9b");

     useEffect(() => {
          const color = CSS.supports("color", baseColor)
               ? baseColor
               : "#F2F0E6";
          document.documentElement.style.setProperty(
               "--base-color",
               color
          );
          localStorage.setItem("baseColor", baseColor);
     }, [baseColor]);

     return (
          <div className="theme-color-picker">
               <input
                    id="color-picker"
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
               />
               <input
                    id="color-picker-text"
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
               />
          </div>
     );
}

export default ThemeColorPicker;