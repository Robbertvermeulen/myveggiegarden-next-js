import { isInTimeframe } from "./time";

export const weekHasContents = (gardenPlan, week, year) => {
  let result = { plants: null, seedlings: null };

  gardenPlan?.areas.forEach((area) =>
    area.soil.forEach((soilObj) =>
      soilObj.contents.forEach((content) => {
        if (isInTimeframe({week, year}, content.timeframe))
          result.plants = true;
      })
    )
  );
  gardenPlan?.seedling.forEach((seedling) => {
    if (isInTimeframe({week, year}, seedling.timeframe))
      result.seedlings = true;
  });
  return result;
};
