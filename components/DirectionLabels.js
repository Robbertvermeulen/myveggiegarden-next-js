import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

const DirectionLabels = () => {
  const [settings] = useContext(SettingsContext);

  let verticalDirectionLabel =
    settings.displayDirection === "horizontal" ? "Width" : "Length";
  let horizontalDirectionLabel =
    settings.displayDirection === "horizontal" ? "Length" : "Width";

  return (
    <div className="garden-direction-labels">
      <span className="garden-direction-label garden-direction-label-vertical">
        {verticalDirectionLabel} in meters &raquo;
      </span>
      <span className="garden-direction-label garden-direction-label-horizontal">
        {horizontalDirectionLabel} in meters &raquo;
      </span>
    </div>
  );
};

export default DirectionLabels;
