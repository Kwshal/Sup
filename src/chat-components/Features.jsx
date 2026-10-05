import { useEffect, useState } from "react";
import { listenToFeatures, addFeature } from "../db";

function Features() {
     const [features, setFeatures] = useState([]);
     const [newFeature, setNewFeature] = useState("");

     useEffect(() => {
          const unsubscribe = listenToFeatures((featuresList) => {
               const featuresArray = Object.values(featuresList || {});
               setFeatures(featuresArray); // Convert the features object to an array
          });

          return () => unsubscribe();
     }, []);

     const handleAddFeature = (feature) => {
          feature && addFeature(feature);
     };

     return (
          <div className="features-wrapper">
          <div className="features">
               <ul>
                    {/* {features.map((feature, index) => (
                         <li key={index}>{feature}</li>
                    ))}
                    <li><h5>Suggestions here</h5></li> */}
               </ul>
               <input
                    type="text"
                    placeholder="Suggest a feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
               />
               <h6>Features you wish whatapp had.</h6>
               <button onClick={() => handleAddFeature(newFeature)}>save suggestion</button>
          </div>
          </div>
     );
}
export default Features;