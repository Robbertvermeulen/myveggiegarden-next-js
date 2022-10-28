import { useMemo } from "react";
import { DateTime } from "luxon";
import Dropdown from "./Dropdown";

const now = DateTime.now();
const currentYear = now.year;

const WeeksDropdown = ({ value, changeHandler, className, label }) => {
  const options = useMemo(() => {
    const options = [{ name: "-- Select week --", value: null }];
    for (let week = 1; week <= 52; week++) {
      const monthLong = DateTime.fromObject({
        weekNumber: week,
        weekYear: currentYear,
      }).monthLong;
      let name = "Week " + week + " (" + monthLong + ")";
      options.push({ name, value: week });
    }
    return options;
  }, []);

  return (
    <Dropdown
      label={label || "Week"}
      className={className}
      options={options}
      value={value}
      changeHandler={changeHandler}
    />
  );
};

export default WeeksDropdown;
