import { getMessage } from "../utils/window";

const GardenAreasList = ({
  areas,
  addAreaHandler,
  deleteAreaHandler,
  clickAreaHandler,
  selectedArea,
}) => {
  const handleAddButtonClick = () => {
    addAreaHandler();
  };

  const handleDeleteButtonClick = (id) => {
    if (confirm(getMessage("sureDeleteArea"))) {
      deleteAreaHandler(id);
    }
  };

  return (
    <div className="garden-areas">
      <ul className="garden-areas-list flex flex-wrap gap-2">
        {areas.length > 0 &&
          areas.map((area, index) => {
            let selected = false;
            const areaNumber = index + 1;
            const { id } = area;
            const classNames = [""];
            classNames.push(`garden-areas-list-item-${id}`);
            if (id === selectedArea) {
              selected = true;
            } else {
              classNames.push("opacity-30");
            }
            return (
              <li
                className={`flex items-center text-white px-4 py-2 cursor-pointer rounded garden-areas-list-item bg-slate-500 border border-slate-500 ${classNames.join(
                  " "
                )}`}
                onClick={() => clickAreaHandler(id)}
              >
                <div className={selected && "mr-3"}>{`Area ${areaNumber}`}</div>
                {selected && (
                  <div onClick={() => handleDeleteButtonClick(id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-3 fill-white"
                    >
                      <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
                    </svg>
                  </div>
                )}
              </li>
            );
          })}
        <li
          className="flex items-center px-4 py-2 text-slate-700 cursor-pointer garden-areas-list-item"
          onClick={handleAddButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-4 fill-slate-500 mr-2"
          >
            <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
          </svg>
          <div>Add area</div>
        </li>
      </ul>
    </div>
  );
};

export default GardenAreasList;
