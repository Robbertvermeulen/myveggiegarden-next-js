import { useContext, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { useResizeDetector } from "react-resize-detector";
import { isEmpty } from "lodash";
import { isInTimeframe } from "../utils/time";
import GardenSoil from "./GardenSoil";
import DirectionLabels from "./DirectionLabels";
import HorizontalRuler from "./HorizontalRuler";
import VerticalRuler from "./VerticalRuler";

const Garden = ({
  children,
  actualWidth,
  actualLength,
  areas,
  selectedArea,
  changeSelectedAreaHandler,
  addSoilHandler,
  editingObjectHandler,
  addPlantHandler,
}) => {
  const [settings, dispatchSetting] = useContext(SettingsContext);
  const { width, height, ref } = useResizeDetector();
  const gridItems = actualWidth * actualLength;
  const aspectRatio =
    settings.displayDirection === "horizontal"
      ? actualLength + "/" + actualWidth
      : actualWidth + "/" + actualLength;

  const classNames = ["garden transition-opacity"];
  if (!areas || isEmpty(areas)) {
    classNames.push("opacity-40");
  }

  useEffect(() => {
    if (width <= 640) {
      dispatchSetting({
        type: "change_display_direction",
        payload: { direction: "vertical" },
      });
    } else {
      dispatchSetting({
        type: "change_display_direction",
        payload: { direction: "horizontal" },
      });
    }
  }, [width]);

  const getGridNumberByCoordinates = (xPosition, yPosition) => {
    if (settings.displayDirection === "horizontal") {
      return yPosition * actualLength - (actualLength - xPosition);
    } else {
      return xPosition * actualWidth - (yPosition - 1);
    }
  };

  const getCoordinatesByGridNumber = (gridNumber) => {
    let xPosition = 0;
    let yPosition = 0;

    if (settings.displayDirection === "horizontal") {
      for (let i = 0; i < gridNumber; i += actualLength) {
        yPosition++;
      }
      xPosition = gridNumber - (yPosition - 1) * actualLength;
    } else {
      for (let i = 0; i < gridNumber; i += actualWidth) {
        xPosition++;
      }
      yPosition =
        actualWidth - (gridNumber - (xPosition - 1) * actualWidth) + 1;
    }
    return { xPosition, yPosition };
  };

  const getGridItemSoil = (gridNumber) => {
    if (!areas || areas.length === 0) return;
    let soil = false;
    areas.forEach((area) => {
      area.soil.forEach((soilObject) => {
        const { xPosition, yPosition } = soilObject;
        if (xPosition && yPosition) {
          const coordinatesGridNumber = getGridNumberByCoordinates(
            xPosition,
            yPosition
          );
          if (coordinatesGridNumber == gridNumber)
            soil = { areaId: area.id, ...soilObject };
        }
      });
    });
    return soil;
  };

  const getSoilObjectById = (soilId) => {
    let soil = false;
    areas.forEach((area) => {
      const result = area.soil.find((soilObj) => soilObj.id === soilId);
      if (result) soil = result;
    });
    return soil;
  };

  const handleGridItemClick = (gridNumber, soilObject) => {
    if (!settings.editMode) return;
    const coordinates = getCoordinatesByGridNumber(gridNumber);
    if (soilObject) {
      const { areaId, id } = soilObject;
      // To change area by clicking soil
      if (soilObject.areaId !== selectedArea) {
        changeSelectedAreaHandler(areaId);
        // To paste plant in copy mode
      } else if (
        settings.tool === "copy_plant" &&
        isEmpty(soilObject.contents)
      ) {
        if (settings.toolSettings?.copyFrom) {
          const copyFromSoilId = settings.toolSettings.copyFrom;
          const copyFromSoilObject = getSoilObjectById(copyFromSoilId);
          if (copyFromSoilObject) {
            const soilContent = copyFromSoilObject.contents.find((content) => {
              return isInTimeframe(settings.pointInTime, content.timeframe);
            });
            if (soilContent)
              addPlantHandler(id, soilContent.timeframe, soilContent.plant);
          }
        }
        // To open soil edit modal
      } else {
        editingObjectHandler({ type: "soil", id });
      }
    } else {
      addSoilHandler(coordinates.xPosition, coordinates.yPosition);
    }
  };

  const renderGridItems = () => {
    const elements = [];
    for (let gridNumber = 1; gridNumber <= gridItems; gridNumber++) {
      let elementWidth = width / actualLength;
      let elementHeight = height / actualWidth;

      if (settings.displayDirection === "vertical") {
        elementWidth = width / actualWidth;
        elementHeight = height / actualLength;
      }

      const classNames = ["garden-grid-item"];
      const soilObject = getGridItemSoil(gridNumber);
      if (soilObject) {
        const { areaId } = soilObject;
        if (selectedArea && selectedArea !== areaId) {
          classNames.push("opacity-40");
        }
      }

      if (settings.editMode) {
        classNames.push("cursor-pointer");
      }

      elements.push(
        <div
          key={gridNumber}
          className={classNames.join(" ")}
          style={{ width: elementWidth + "px", height: elementHeight + "px" }}
        >
          <div
            className="garden-grid-item-inner"
            onClick={() => handleGridItemClick(gridNumber, soilObject)}
          >
            {soilObject && <GardenSoil {...soilObject} />}
          </div>
        </div>
      );
    }
    return elements;
  };

  return (
    <div
      ref={ref}
      className={classNames.join(" ")}
      style={{ width: "100%", aspectRatio }}
    >
      {children}
      <DirectionLabels />
      <VerticalRuler
        sizeInPixels={height}
        actualSize={
          settings.displayDirection === "horizontal"
            ? actualWidth
            : actualLength
        }
      />
      <HorizontalRuler
        sizeInPixels={width}
        actualSize={
          settings.displayDirection === "horizontal"
            ? actualLength
            : actualWidth
        }
      />
      <div class="garden-grid">{renderGridItems()}</div>
    </div>
  );
};

export default Garden;
