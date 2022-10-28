import { useState, useEffect } from "react";
import { getPlants } from "../utils/window";
import Field from "./Field";

const PlantSelector = ({ selectedPlant, selectedPlantHandler }) => {
  const plantsList = getPlants();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(plantsList);

  const getPlantObject = (plantId) => {
    return plantsList.find((plant) => plant.id === plantId);
  };

  const handleSearchFieldChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleResultClick = (plantId) => {
    setSearchValue("");
    selectedPlantHandler(plantId);
  };

  useEffect(() => {
    setSearchResults(
      plantsList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  useEffect(() => {
    if (selectedPlant) setSearchResults([]);
  }, [selectedPlant]);

  const renderSelectedPlant = () => {
    const selectedPlantObject = getPlantObject(selectedPlant);
    return (
      <div className="p-4 flex justify-between items-center border border-green-600 bg-green-50 shadow rounded">
        <span>{selectedPlantObject?.name}</span>
        <div className={"w-1/12 flex justify-end"}>
          <img src={selectedPlantObject.imageUrl} className={"w-10/12"} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-3">
        <Field
          placeholder={"Search plants.."}
          changeHandler={handleSearchFieldChange}
          value={searchValue}
        />
      </div>
      <div className="mb-3">
        {searchResults && searchResults.length > 0 && (
          <ul
            className={"rounded border border-slate-200 overflow-scroll h-18"}
          >
            {searchResults.map((result, index) => (
              <li
                className={`py-3 px-4 cursor-pointer hover:bg-slate-100 ${
                  index % 2 && "bg-slate-50"
                }`}
                onClick={() => handleResultClick(result.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span>{result.name}</span>
                  </div>
                  <div className={"w-1/12 flex justify-end"}>
                    <img src={result.imageUrl} className={"w-10/12"} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedPlant && !searchValue && renderSelectedPlant()}
    </div>
  );
};

export default PlantSelector;
