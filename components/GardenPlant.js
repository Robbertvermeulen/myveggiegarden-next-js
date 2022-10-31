import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

const GardenPlant = ({ id }) => {
  const [settings] = useContext(SettingsContext);
  const getPlantData = () => {
    return settings?.plants.find((plant) => plant.id == id);
  };
  const { imageUrl } = getPlantData();

  return (
    <div className="garden-grid-item-plant">
      {imageUrl && <img src={imageUrl} style={{ width: "60%" }} />}
    </div>
  );
};

export default GardenPlant;
