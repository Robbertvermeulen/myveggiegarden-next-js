const GardenPlant = ({ id }) => {
  const getPlantData = () => {
    return window?.gppt?.plants?.find((plant) => plant.id == id);
  };
  const { imageUrl } = getPlantData();

  return (
    <div className="garden-grid-item-plant">
      {imageUrl && <img src={imageUrl} style={{ width: "60%" }} />}
    </div>
  );
};

export default GardenPlant;
