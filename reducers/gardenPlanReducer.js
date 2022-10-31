const { DateTime } = require("luxon");

const createId = () => {
  const timestamp = DateTime.now().toMillis();
  return timestamp.toString(16);
};

export const initialState = {
  title: "",
  location: {
    address: "",
    longitude: "",
    latitude: "",
  },
  actualLength: 20,
  actualWidth: 10,
  areas: [],
  seedlings: [],
  selectedArea: null,
};

export const gardenPlanReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "set_state":
      return { ...state, ...payload };
    case "add_area":
      const areaId = createId();
      return {
        ...state,
        areas: [...state.areas, { id: areaId, soil: [] }],
        selectedArea: areaId,
      };
    case "change_selected_area":
      return { ...state, selectedArea: payload.id };
    case "delete_area":
      return {
        ...state,
        areas: [...state.areas.filter((area) => area.id !== payload.id)],
      };
    case "add_soil":
      return {
        ...state,
        areas: [
          ...state.areas.map((area) => {
            if (area.id === state.selectedArea) {
              area.soil.push({
                id: createId(),
                contents: [],
                xPosition: payload.xPosition,
                yPosition: payload.yPosition,
              });
            }
            return area;
          }),
        ],
      };
    case "delete_soil":
      return {
        ...state,
        areas: [
          ...state.areas?.map((area) => {
            area.soil = area.soil.filter(
              (soilObj) => soilObj.id !== payload.id
            );
            return area;
          }),
        ],
      };
    case "add_plant_to_soil":
      return {
        ...state,
        areas: [
          ...state.areas.map((area) => {
            area.soil = area.soil.map((soilObj) => {
              if (soilObj.id === payload.soilId) {
                soilObj.contents.push({
                  id: createId(),
                  timeframe: {
                    start: { ...payload.timeframeObj.start },
                    end: { ...payload.timeframeObj.end },
                  },
                  plant: payload.plantObj,
                });
              }
              return soilObj;
            });
            return area;
          }),
        ],
      };
    case "edit_soil_plant":
      return {
        ...state,
        areas: [
          ...state.areas.map((area) => {
            area.soil.map((soilObj) => {
              if (soilObj.id != payload.soilId) return soilObj;
              soilObj.contents = soilObj.contents.map((content) => {
                if (payload.contentId != content.id) return content;
                return {
                  ...content,
                  timeframe: payload.timeframeObj,
                  plant: payload.plantObj,
                };
              });
              return soilObj;
            });
            return area;
          }),
        ],
      };
    case "delete_plant":
      return {
        ...state,
        areas: [
          ...state.areas.map((area) => {
            area.soil = area.soil.map((soilObj) => {
              if (soilObj.id != payload.soilId) return soilObj;
              soilObj.contents = soilObj.contents.filter((content) => {
                return payload.contentId !== content.id;
              });
              return soilObj;
            });
            return area;
          }),
        ],
      };
    case "change_actual_length":
      return { ...state, actualLength: payload.value * 2 };
    case "change_actual_width":
      return { ...state, actualWidth: payload.value * 2 };
    case "add_seedling":
      return {
        ...state,
        seedlings: [
          ...state.seedlings,
          {
            id: createId(),
            timeframe: {
              start: { ...payload.timeframeObj.start },
              end: { ...payload.timeframeObj.end },
            },
            plant: payload.plantObj,
          },
        ],
      };
    case "edit_seedling":
      return {
        ...state,
        seedlings: state.seedlings.map((item) => {
          if (payload.seedlingId === item.id) {
            return {
              ...item,
              timeframe: payload.timeframeObj,
              plant: payload.plantObj,
            };
          }
          return item;
        }),
      };
    case "delete_seedling":
      return {
        ...state,
        seedlings: state.seedlings.filter(
          (item) => payload.seedlingId != item.id
        ),
      };
    default:
      return state;
  }
};
