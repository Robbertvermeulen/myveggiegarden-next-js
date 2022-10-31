import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import DateChanger from "./DateChanger";
import { weekHasContents } from "../utils/gardenPlan";

const PointInTimeSelector = ({ areas, seedlings, weekClickHandler }) => {
  const [settings, dispatchSetting] = useContext(SettingsContext);
  const { week, year } = settings.pointInTime;

  const handleNextYearButtonClick = () => {
    if (settings.tool) return;
    dispatchSetting({
      type: "change_point_in_time",
      payload: { year: year + 1 },
    });
  };

  const handlePreviousYearButtonClick = () => {
    if (settings.tool) return;
    dispatchSetting({
      type: "change_point_in_time",
      payload: { year: year - 1 },
    });
  };

  return (
    <div className="bg-white rounded shadow-xl overflow-hidden">
      <header className="p-4 flex justify-center bg-slate-600">
        <span class="text-white text-center">
          Select a week ({`Week ${week}, ${year}`})
        </span>
      </header>
      <div>
        <DateChanger
          value={year}
          appearence="full"
          nextButtonClickHandler={handleNextYearButtonClick}
          previousButtonClickHandler={handlePreviousYearButtonClick}
        />
      </div>
      <div className="p-6 inline-flex flex-wrap gap-3 justify-center">
        {(() => {
          let weekElements = [];
          for (let weekNumber = 1; weekNumber <= 52; weekNumber++) {
            const classNames = [
              "flex items-center justify-center rounded-full w-9 h-9 z-10 text-sm cursor-pointer",
            ];
            const contents = weekHasContents(
              { areas, seedlings },
              weekNumber,
              year
            );

            if (week === weekNumber) {
              classNames.push("bg-slate-700 text-white");
            } else if (contents.plants) {
              classNames.push("bg-[#755d41] text-white");
              if (contents.seedlings)
                classNames.push("border border-2 border-green-600");
            } else if (contents.seedlings) {
              classNames.push("bg-green-600 text-white");
            } else {
              classNames.push("bg-slate-100 hover:bg-slate-200");
            }
            weekElements.push(
              <div
                className={classNames.join(" ")}
                onClick={() => {
                  dispatchSetting({
                    type: "change_point_in_time",
                    payload: { week: weekNumber },
                  });
                  if (weekClickHandler) weekClickHandler();
                }}
              >
                {weekNumber}
              </div>
            );
          }
          return weekElements;
        })()}
      </div>
    </div>
  );
};

export default PointInTimeSelector;
