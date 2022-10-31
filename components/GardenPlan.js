import DisplayDirectionSelector from "./DisplayDirectionSelector";
import WeekSelector from "./WeekSelector";
import GardenCanvas from "./GardenCanvas";
import Garden from "./Garden";
import GardenSeedling from "./GardenSeedlings";

const GardenPlan = ({ actualLength, actualWidth, areas, seedlings }) => {
  return (
    <div className="garden-plan">
      <header className="mb-6 flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-between items-center">
        <h2 className="mb-4 md:mb-0 font-semibold text-2xl font-serif">
          Garden plan
        </h2>
        <div className="flex gap-3">
          <DisplayDirectionSelector />
          <WeekSelector />
        </div>
      </header>
      <div className="mb-6">
        <GardenCanvas>
          <Garden
            actualLength={actualLength}
            actualWidth={actualWidth}
            areas={areas}
          />
        </GardenCanvas>
      </div>
      <header className="mb-6 flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-between items-center">
        <h2 className="mb-4 md:mb-0 font-semibold text-2xl font-serif">
          Seedlings
        </h2>
        <WeekSelector />
      </header>
      <GardenSeedling seedlings={seedlings} />
    </div>
  );
};

export default GardenPlan;
