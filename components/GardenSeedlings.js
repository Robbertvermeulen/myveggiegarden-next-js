import { useContext } from "react";
import { isInTimeframe } from "../utils/time";
import { GardenPlanContext } from "../context/GardenPlanContext";
import { SettingsContext } from "../context/SettingsContext";

const GardenSeedlings = ({ addButtonClickHandler, itemClickHandler }) => {
  const [gardenPlan] = useContext(GardenPlanContext);
  const [settings] = useContext(SettingsContext);
  const nowSeedlings = gardenPlan.seedling.filter((item) =>
    isInTimeframe(settings.pointInTime, item.timeframe)
  );

  const getPlantData = (id) => {
    return window?.gppt?.plants?.find((plant) => plant.id == id);
  };

  return (
    <div className="garden-seedling p-3 rounded flex flex-wrap">
      {nowSeedlings.map((item) => {
        const { imageUrl, name } = getPlantData(item.plant.id);
        return (
          <div className="p-1 w-1/3 md:w-1/6">
            <div
              className="flex justify-center h-full p-2 rounded bg-[rgba(0,0,0,0.05)] cursor-pointer"
              onClick={() => itemClickHandler(item.id)}
            >
              <div className="garden-seedling-item-inner">
                <div className="garden-seedling-item-icon mb-1 relative">
                  {imageUrl && <img src={imageUrl} style={{ width: "60%" }} />}
                  <span className="absolute bg-white rounded-full px-1 text-xs bottom-0 right-1">
                    {item.plant.amount}
                  </span>
                </div>
                <div className="garden-seedling-item-content">
                  <span className="text-sm">{name}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="p-1" onClick={addButtonClickHandler}>
        <div className="h-full flex items-center justify-center flex-col px-4 py-1 text-slate-700 cursor-pointer garden-areas-list-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 fill-slate-500 mb-1"
          >
            <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
          </svg>
          <div>Add seedling</div>
        </div>
      </div>
    </div>
  );
};

export default GardenSeedlings;
