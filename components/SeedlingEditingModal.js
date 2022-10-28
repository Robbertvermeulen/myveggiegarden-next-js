import { useReducer, useContext, useEffect } from "react";
import {
  initialState,
  editingModalReducer,
} from "../reducers/editingModalReducer";
import { SettingsContext } from "../context/SettingsContext";
import Field from "./Field";
import Modal from "./Modal";
import YearsDropdown from "./YearsDropdown";
import WeeksDropdown from "./WeeksDropdown";
import PlantSelector from "./PlantSelector";
import Alert from "./Alert";

const SeedlingEditingModal = ({
  editingId,
  getSeedlingHandler,
  closeModalHandler,
  addSeedlingHandler,
  editSeedlingHandler,
  deleteSeedlingHandler,
}) => {
  const [settings] = useContext(SettingsContext);
  const [state, dispatch] = useReducer(editingModalReducer, initialState);
  const editingSeedlingObject = getSeedlingHandler(editingId);

  useEffect(() => {
    dispatch({ type: "set_type", payload: { type: "seedling" } });
  }, []);

  useEffect(() => {
    if (editingId) {
      dispatch({ type: "set_menu_mode" });
    } else {
      dispatch({ type: "set_add_plant_mode" });
    }
  }, [editingId]);

  useEffect(() => {
    dispatch({
      type: "update_timeframe_start",
      payload: settings.pointInTime,
    });
  }, [settings.pointInTime]);

  const handleSubmitButtonClick = () => {
    let errors = false;
    if (!state.mode) return;
    const plantObj = { id: state.selectedPlant, amount: state.amount };
    if (state.mode === "add_plant") {
      addSeedlingHandler(state.timeframe, plantObj);
    } else if (state.mode === "edit_plant") {
      editSeedlingHandler(editingId, state.timeframe, plantObj);
    }
    if (!errors) closeModalHandler();
  };

  const canSubmit = () => {
    return state.selectedPlant && state.amount && state.timeframe;
  };

  return (
    <Modal overlayClickHandler={closeModalHandler}>
      {state.errors &&
        state.errors.map((error) => <Alert type="error" message={error} />)}
      {(state.mode === "menu" && (
        <div className="lg:px-8">
          <header className="mb-5">
            <h2 className="text-xl font-semibold text-center">
              What to do with this seedling?
            </h2>
          </header>
          <div>
            <button
              className="button button-edit mb-3 shadow-md"
              onClick={() => {
                dispatch({
                  type: "set_edit_plant_mode",
                  payload: {
                    plantId: editingSeedlingObject.plant.id,
                    timeframe: editingSeedlingObject.timeframe,
                    amount: editingSeedlingObject.plant.amount,
                  },
                });
              }}
            >
              Edit seedling
            </button>
            <button
              className="button button-delete mb-3 shadow-md"
              onClick={() => {
                deleteSeedlingHandler(editingId);
                closeModalHandler();
              }}
            >
              Delete seedling
            </button>
          </div>
        </div>
      )) ||
        ((state.mode === "add_plant" || state.mode === "edit_plant") && (
          <>
            <div>
              <header className="mb-3">
                <h2 className="font-semibold text-lg">{state.headText}</h2>
              </header>
              <div className="mb-5">
                <PlantSelector
                  selectedPlant={state.selectedPlant}
                  selectedPlantHandler={(plantId) =>
                    dispatch({
                      type: "update_selected_plant",
                      payload: plantId,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <Field
                  type="number"
                  label="Number of seedlings"
                  placeholder={0}
                  value={state.amount}
                  changeHandler={(e) =>
                    dispatch({
                      type: "update_amount",
                      payload: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <header className="mb-3">
                  <h3 className="font-semibold text-md">Start seedling:</h3>
                </header>
                <div className="flex gap-4">
                  <WeeksDropdown
                    label={"Week"}
                    className="w-1/2"
                    value={state.timeframe.start.week}
                    changeHandler={(e) =>
                      dispatch({
                        type: "update_timeframe_start",
                        payload: { week: e.target.value },
                      })
                    }
                  />
                  <YearsDropdown
                    label={"Year"}
                    className="w-1/2"
                    value={state.timeframe.start.year}
                    changeHandler={(e) =>
                      dispatch({
                        type: "update_timeframe_start",
                        payload: { year: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="mb-6">
                <header className="mb-3">
                  <h3 className="font-semibold text-md">Plant seedling:</h3>
                </header>
                <div className="flex gap-4">
                  <WeeksDropdown
                    label={"Week"}
                    className="w-1/2"
                    value={state.timeframe.end?.week}
                    changeHandler={(e) =>
                      dispatch({
                        type: "update_timeframe_end",
                        payload: { week: e.target.value },
                      })
                    }
                  />
                  <YearsDropdown
                    label={"Year"}
                    className="w-1/2"
                    value={state.timeframe.end.year}
                    changeHandler={(e) =>
                      dispatch({
                        type: "update_timeframe_end",
                        payload: { year: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <button
                  className="button button-add shadow-md"
                  onClick={handleSubmitButtonClick}
                  disabled={!canSubmit()}
                >
                  {state.submitButtonText}
                </button>
              </div>
            </div>
          </>
        ))}
    </Modal>
  );
};

export default SeedlingEditingModal;
