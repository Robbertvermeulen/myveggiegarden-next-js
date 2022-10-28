export const getMessage = (key) => {
  return window?.gppt?.messages[key];
};

export const getPlants = () => {
  return window?.gppt?.plants;
};
