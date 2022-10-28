import { DateTime } from "luxon";

const now = DateTime.now();
const currentYear = now.year;
const currentWeek = now.weekNumber;
const endWeek = currentWeek + 1 > 52 ? 1 : currentWeek + 1;

export const initialState = {
  type: null,
  mode: false,
  selectedPlant: false,
  amount: 1,
  timeframe: {
    start: { year: currentYear, week: currentWeek },
    end: { year: currentYear, week: endWeek },
  },
  submitButtonText: "",
  headText: "",
  errors: [],
};

export const editingModalReducer = (state, action) => {
  const { type, payload } = action;
  const updateState = { ...state };
  switch (type) {
    case "set_type":
      updateState.type = payload.type;
      if (payload.type === "soil") {
        updateState.headText = "Plant a plant";
        updateState.submitButtonText = "Plant";
      } else if (payload.type === "seedling") {
        updateState.headText = "Add a seedling";
        updateState.submitButtonText = "Add seedling";
      }
      return updateState;
    case "set_menu_mode":
      return {
        ...state,
        mode: "menu",
      };
    case "set_edit_plant_mode":
      return {
        ...state,
        mode: "edit_plant",
        selectedPlant: payload.plantId,
        timeframe: payload.timeframe,
        amount: payload.amount,
        submitButtonText:
          state.type === "seedling" ? "Edit seedling" : "Edit plant",
        headText: state.type === "seedling" ? "Edit seedling" : "Edit plant",
      };
    case "set_add_plant_mode":
      return {
        ...state,
        mode: "add_plant",
        timeframe: initialState.timeframe,
      };
    case "update_selected_plant":
      return { ...state, selectedPlant: payload };
    case "update_timeframe_start":
      if (payload.week)
        updateState.timeframe.start.week = parseInt(payload.week);
      if (payload.year)
        updateState.timeframe.start.year = parseInt(payload.year);

      const { week, year } = updateState.timeframe.start;
      const endWeek = updateState.timeframe.end.week;
      if (endWeek <= week) {
        let updatedEndWeek = week + 1;
        if (updatedEndWeek > 52) {
          updateState.timeframe.end = {
            week: 1,
            year: year + 1,
          };
        } else {
          updateState.timeframe.end.week = updatedEndWeek;
        }
      }
      if (updateState.timeframe.end.year <= year)
        updateState.timeframe.end.year = year;

      return updateState;
    case "update_timeframe_end":
      if (payload.week) updateState.timeframe.end.week = parseInt(payload.week);
      if (payload.year) updateState.timeframe.end.year = parseInt(payload.year);
      return updateState;
    case "update_amount":
      return { ...state, amount: parseInt(payload) };
    case "set_errors":
      return { ...state, errors: payload.errors };
    default:
      return state;
  }
};
