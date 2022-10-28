export const isInTimeframe = (pointInTime, timeframe) => {
  const { year, week } = pointInTime;
  const { start, end } = timeframe;

  if (start.year <= year && end.year >= year) {
    if (end.year > start.year) {
      if (end.year === year){
        return end.week > week;
      } else {
        return start.week <= week;
      }
    } else {
      return start.week <= week && end.week > week;
    }
  }
  return false;

};
