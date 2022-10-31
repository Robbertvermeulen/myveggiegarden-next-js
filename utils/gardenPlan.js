import { isInTimeframe } from "./time";

export const weekHasContents = ({ areas, seedlings }, week, year) => {
  let result = { plants: null, seedlings: null };

  if (areas)
    areas.forEach((area) =>
      area.soil.forEach((soilObj) =>
        soilObj.contents.forEach((content) => {
          if (isInTimeframe({ week, year }, content.timeframe))
            result.plants = true;
        })
      )
    );

  if (seedlings)
    seedlings.forEach((seedling) => {
      if (isInTimeframe({ week, year }, seedling.timeframe))
        result.seedlings = true;
    });

  return result;
};
