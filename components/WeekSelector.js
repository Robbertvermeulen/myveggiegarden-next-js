import { useContext } from "react";
import { DateTime } from "luxon";
import { SettingsContext } from "../context/SettingsContext";
import DateChanger from "./DateChanger";

const WeekSelector = ({ valueClickHandler }) => {
  const [settings, dispatchSetting] = useContext(SettingsContext);
  const { week, year } = settings.pointInTime;
  const monthLong = DateTime.fromObject({
    weekNumber: week,
    weekYear: year,
  })?.monthLong;

  const handleNextButtonClick = () => {
    if (settings.tool) return;
    let updatedWeek = week;
    let updatedYear = year;
    if (week + 1 > 52) {
      updatedWeek = 1;
      updatedYear++;
    } else {
      updatedWeek++;
    }
    dispatchSetting({
      type: "change_point_in_time",
      payload: { week: updatedWeek, year: updatedYear },
    });
  };

  const handlePreviousButtonClick = () => {
    if (settings.tool) return;
    let updatedWeek = week;
    let updatedYear = year;
    if (week - 1 < 1) {
      updatedWeek = 52;
      updatedYear--;
    } else {
      updatedWeek--;
    }
    dispatchSetting({
      type: "change_point_in_time",
      payload: { week: updatedWeek, year: updatedYear },
    });
  };

  let classNames = [];
  if (settings.tool) {
    classNames.push("opacity-50 cursor-not-allowed");
  }

  return (
    <div>
      <DateChanger
        className={classNames.join(" ")}
        value={`Week ${week} (${monthLong}), ${year}`}
        valueClickHandler={valueClickHandler}
        previousButtonClickHandler={handlePreviousButtonClick}
        nextButtonClickHandler={handleNextButtonClick}
      />
    </div>
  );
};

export default WeekSelector;
