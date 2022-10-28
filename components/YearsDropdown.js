import { useMemo } from "react";
import { DateTime } from "luxon";
import Dropdown from "./Dropdown";

const YearsDropdown = ({ value, changeHandler, className, label }) => {
  const options = useMemo(() => {
    const currentYear = DateTime.now().year;
    let options = [{ name: "-- Select year --", value: null }];
    for (let year = currentYear; year <= currentYear + 5; year++) {
      options.push({ name: year, value: year });
    }
    return options;
  }, []);

  return (
    <Dropdown
      label={label || "Year"}
      className={className}
      options={options}
      value={value}
      changeHandler={changeHandler}
    />
  );
};

export default YearsDropdown;
