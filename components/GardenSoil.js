import { useContext } from "react";
import { isInTimeframe } from "../utils/time";
import GardenPlant from "./GardenPlant";
import { SettingsContext } from "../context/SettingsContext";

const GardenSoil = ({ id, contents }) => {
  const [settings] = useContext(SettingsContext);
  const soilContent =
    contents &&
    contents.find((content) => {
      return isInTimeframe(settings.pointInTime, content.timeframe);
    });
  const classNames = ["garden-grid-item-soil"];
  if (settings.tool) {
    switch (settings.tool) {
      case "copy_plant":
        const soilId = settings.toolSettings?.copyFrom;
        if (soilId && soilId === id) {
          classNames.push("border border-2 border-orange-400");
        }
      default:
    }
  }

  return (
    <div className={classNames.join(" ")}>
      {soilContent?.plant && <GardenPlant {...soilContent.plant} />}
      {soilContent?.plant && soilContent.plant.amount && (
        <span className="garden-grid-item-plant-amount">
          {soilContent.plant.amount}
        </span>
      )}
    </div>
  );
};

export default GardenSoil;
