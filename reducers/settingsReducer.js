const { DateTime } = require("luxon");
const now = DateTime.now();

export const initialState = {
  sizeUnit: "m",
  displayDirection: "horizontal",
  pointInTime: {
    week: now.weekNumber,
    year: now.year,
  },
  editMode: false,
  dateChanging: true,
  tool: false,
  toolSettings: {},
  plants: [],
};

export const settingsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "change_size_unit":
      return { ...state, sizeUnit: payload };
    case "change_display_direction":
      return { ...state, displayDirection: payload.direction };
    case "change_point_in_time":
      let updatedState = { ...state };
      if (payload.week) {
        updatedState.pointInTime.week = payload.week;
      }
      if (payload.year) {
        updatedState.pointInTime.year = payload.year;
      }
      return updatedState;
    case "change_edit_mode":
      return { ...state, editMode: payload };
    case "activate_tool":
      return {
        ...state,
        tool: payload.tool,
        toolSettings: payload.toolSettings,
        dateChanging: false,
      };
    case "deactivate_tool":
      return {
        ...state,
        tool: false,
        toolSettings: {},
        dateChanging: true,
      };
    case "set_plants":
      return { ...state, plants: payload };
    default:
      return { ...state };
  }
};
