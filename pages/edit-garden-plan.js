import { useReducer, useContext, useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../utils/apollo-client";
import { SettingsContext } from "../context/SettingsContext";
import { initialState, gardenPlanReducer } from "../reducers/gardenPlanReducer";
import Head from "next/head";
import Header from "../components/Header";
import GardenAreasList from "../components/GardenAreasList";
import GardenCanvas from "../components/GardenCanvas";
import Garden from "../components/Garden";
import GardenSeedlings from "../components/GardenSeedlings";
import WeekSelector from "../components/WeekSelector";
import DisplayDirectionSelector from "../components/DisplayDirectionSelector";
import Field from "../components/Field";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import PointInTimeSelector from "../components/PointInTimeSelector";
import SoilEditingModal from "../components/SoilEditingModal";
import SeedlingEditingModal from "../components/SeedlingEditingModal";

export default function gardenPlanEditor({ data }) {
  const [settings, dispatchSetting] = useContext(SettingsContext);
  const { planDetails, planning } = data.gardenPlan;
  const planningObj = planning && JSON.parse(planning);
  const [state, dispatch] = useReducer(gardenPlanReducer, {
    ...initialState,
    actualLength: planDetails?.actualLength,
    actualWidth: planDetails?.actualWidth,
    areas: planningObj?.areas || [],
    seedlings: planningObj?.seedlings || [],
  });
  const [pointInTimeSelector, setPointInTimeSelector] = useState(false);
  const [editingObject, setEditingObject] = useState({
    type: null,
    id: null,
  });

  useEffect(() => {
    dispatchSetting({ type: "change_edit_mode", payload: true });
  }, []);

  const getSoil = (id) => {
    let soil = false;
    state.areas.forEach((area) => {
      let result = area.soil.find((soilObj) => soilObj.id === id);
      if (result) {
        soil = result;
      }
    });
    return soil;
  };

  const getSeedling = (id) => {
    return state.seedlings.find((item) => {
      return item.id === id;
    });
  };

  const deleteSoil = (id) => {
    dispatch({ type: "delete_soil", payload: { id } });
  };

  const addPlantToSoil = (soilId, timeframeObj, plantObj) => {
    dispatch({
      type: "add_plant_to_soil",
      payload: { soilId, timeframeObj, plantObj },
    });
  };

  const editSoilPlant = (soilId, contentId, timeframeObj, plantObj) => {
    dispatch({
      type: "edit_soil_plant",
      payload: { soilId, contentId, timeframeObj, plantObj },
    });
  };

  const deleteSoilPlant = (soilId, contentId) => {
    dispatch({ type: "delete_plant", payload: { soilId, contentId } });
  };

  const addSeedling = (timeframeObj, plantObj) => {
    dispatch({ type: "add_seedling", payload: { timeframeObj, plantObj } });
  };

  const deleteSeedling = (seedlingId) => {
    dispatch({ type: "delete_seedling", payload: { seedlingId } });
  };

  const editSeedling = (seedlingId, timeframeObj, plantObj) => {
    dispatch({
      type: "edit_seedling",
      payload: { seedlingId, timeframeObj, plantObj },
    });
  };

  const closeEditingModal = () => {
    setEditingObject({ type: null, id: null });
  };

  const validateAddPlantToSoil = (soilId, timeframe) => {
    const errors = [];
    const { start, end } = timeframe;
    state.areas.forEach((area) => {
      const currentSoil = area.soil.find((soilObj) => soilObj.id === soilId);
      if (currentSoil) {
        currentSoil.contents.forEach((content) => {
          const inTimeFrame =
            isInTimeframe({ ...start }, content.timeframe) ||
            isInTimeframe({ ...end }, content.timeframe);
          if (inTimeFrame) {
            errors.push(
              "There has already been something planted in this period on this piece of soil."
            );
          }
        });
      }
    });
    return {
      valid: errors.length === 0,
      errors,
    };
  };

  return (
    <>
      <Head>
        <title>Edit garden plan - Myveggiegarden.how</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="px-4 py-6 lg:py-12 bg-[#f9f8f2] border-t border-t-[rgba(0,0,0,0.1)] shadow-inner">
        <div className="container mx-auto">
          <div className="garden-plan-editor">
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
              <div className="col-span-full lg:col-span-3">
                <div className="p-8 rounded bg-white border border-[rgba(0,0,0,0.15)] shadow-sm">
                  <header className="mb-5 pb-3 border-b border-b-[rgba(0,0,0,0.2)] border-dotted">
                    <h2 className="font-semibold text-xl">Garden details</h2>
                  </header>
                  <div className="mb-6">
                    <div className="mb-5">
                      <Field
                        type="text"
                        label={`Garden name`}
                        placeholder={`My vegetable garden`}
                      />
                    </div>
                    <div className="mb-5">
                      <Field
                        type="number"
                        label={`Length (${settings.sizeUnit})`}
                        placeholder={settings.sizeUnit}
                        value={
                          (state.actualLength && state.actualLength / 2) || ""
                        }
                        changeHandler={(e) =>
                          dispatch({
                            type: "change_actual_length",
                            payload: { value: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="mb-5">
                      <Field
                        type="number"
                        label={`Width (${settings.sizeUnit})`}
                        placeholder={settings.sizeUnit}
                        value={
                          (state.actualWidth && state.actualWidth / 2) || ""
                        }
                        changeHandler={(e) =>
                          dispatch({
                            type: "change_actual_width",
                            payload: { value: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="mb-5">
                      <Field
                        type="text"
                        label={`Location`}
                        placeholder={"Search location.."}
                      />
                    </div>
                    <div className="mb-5">
                      <div>
                        <Dropdown
                          label={`Garden facing`}
                          options={[
                            { name: "North", value: "north" },
                            { name: "East", value: "east" },
                            { name: "West", value: "west" },
                            { name: "South", value: "south" },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="button button-primary shadow-md">
                    Save
                  </button>
                </div>
              </div>
              <div className="col-span-full lg:col-span-9 relative">
                <div className="mb-6">
                  <div className="mb-6">
                    <header className="p-4 flex flex-wrap lg:flex-nowrap flex-col lg:flex-row items-center justify-between rounded-t bg-white border border-[rgba(0,0,0,0.15)] shadow-sm">
                      <div className="flex gap-3">
                        <DisplayDirectionSelector />
                        <WeekSelector
                          valueClickHandler={() => setPointInTimeSelector(true)}
                        />
                      </div>
                      <div>
                        <button className="button button-primary shadow-md hidden lg:block">
                          Save
                        </button>
                      </div>
                    </header>
                    <div className="p-5 rounded-b bg-[rgba(0,0,0,0.05)] shadow-inner">
                      <GardenAreasList
                        areas={state.areas}
                        addAreaHandler={() =>
                          dispatch({
                            type: "add_area",
                          })
                        }
                        deleteAreaHandler={(id) =>
                          dispatch({ type: "delete_area", payload: { id } })
                        }
                        clickAreaHandler={(id) =>
                          dispatch({
                            type: "change_selected_area",
                            payload: { id },
                          })
                        }
                        selectedArea={state.selectedArea}
                      />
                    </div>
                  </div>
                  {settings.tool === "copy_plant" && (
                    <div
                      className="mb-3 px-3 py-3 bg-orange-500 rounded text-white text-center cursor-pointer"
                      onClick={() => {
                        console.log("clicked");
                        dispatchSetting({
                          type: "deactivate_tool",
                          payload: { tool: "copy_plant" },
                        });
                      }}
                    >
                      Copy/paste mode active |{" "}
                      <span className="underline font-semibold">Turn off</span>
                    </div>
                  )}
                  <GardenCanvas>
                    <Garden
                      actualLength={state.actualLength}
                      actualWidth={state.actualWidth}
                      areas={state.areas}
                      selectedArea={state.selectedArea}
                      changeSelectedAreaHandler={(areaId) => {
                        dispatch({
                          type: "change_selected_area",
                          payload: { id: areaId },
                        });
                      }}
                      addSoilHandler={(xPosition, yPosition) =>
                        dispatch({
                          type: "add_soil",
                          payload: { xPosition, yPosition },
                        })
                      }
                      editingObjectHandler={setEditingObject}
                      addPlantHandler={addPlantToSoil}
                    ></Garden>
                  </GardenCanvas>
                </div>
                <div>
                  <header className="mb-6 flex lg:flex-nowrap lg:flex-row justify-between items-center">
                    <h2 className="font-semibold text-2xl">Seedlings</h2>
                    <WeekSelector
                      valueClickHandler={() => setPointInTimeSelector(true)}
                    />
                  </header>
                  <GardenSeedlings
                    seedling={state.seedlings}
                    addButtonClickHandler={() =>
                      setEditingObject({
                        type: "seedling",
                      })
                    }
                    itemClickHandler={(seedlingId) => {
                      setEditingObject({
                        type: "seedling",
                        id: seedlingId,
                      });
                    }}
                  />
                </div>
                {pointInTimeSelector && (
                  <Modal
                    noStyling={true}
                    overlayClickHandler={() => setPointInTimeSelector(false)}
                  >
                    <PointInTimeSelector
                      areas={state.areas}
                      seedlings={state.seedlings}
                      weekClickHandler={() => setPointInTimeSelector(false)}
                    />
                  </Modal>
                )}
                {(editingObject.type === "soil" && (
                  <SoilEditingModal
                    editingId={editingObject?.id}
                    getSoilHandler={getSoil}
                    closeModalHandler={closeEditingModal}
                    addPlantHandler={addPlantToSoil}
                    deleteSoilHandler={deleteSoil}
                    editPlantHandler={editSoilPlant}
                    deletePlantHandler={deleteSoilPlant}
                    validateAddPlantToSoilHandler={validateAddPlantToSoil}
                  />
                )) ||
                  (editingObject.type === "seedling" && (
                    <SeedlingEditingModal
                      editingId={editingObject?.id}
                      getSeedlingHandler={getSeedling}
                      closeModalHandler={closeEditingModal}
                      addSeedlingHandler={addSeedling}
                      editSeedlingHandler={editSeedling}
                      deleteSeedlingHandler={deleteSeedling}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query GardenPlan {
        gardenPlan(id: 12, idType: DATABASE_ID) {
          planDetails {
            actualLength
            actualWidth
          }
          planning
        }
        plants {
          nodes {
            plantData {
              plantIcon {
                mediaItemUrl
                title
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      data: data,
    },
  };
}
