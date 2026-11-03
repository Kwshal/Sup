import { useState } from "react";
import { addFeature } from "../db";

function Features({ onClose }) {
     const [newFeature, setNewFeature] = useState("");

     const handleAddFeature = (feature) => {
          feature && addFeature(feature);
     };

     return (
          <div
               className="features-wrapper"
               onClick={e => {
                    if (e.target === e.currentTarget) onClose();
               }}
          >
               <section className="features" role="dialog" aria-modal="true" aria-labelledby="features-title">
                    {/* <h3 id="features-title">Suggest a feature</h3> */}
                    <input
                         type="text"
                         placeholder="Suggest a feature"
                         aria-label="Your suggestion"
                         value={newFeature}
                         onChange={(e) => setNewFeature(e.target.value)}
                    />
                    {/* <h6>Share a feature you would like to see in Sup_.</h6> */}
                    <button type="button" onClick={() => handleAddFeature(newFeature)}>Save</button>
               </section>
          </div>
     );
}
export default Features;