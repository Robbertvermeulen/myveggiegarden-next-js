import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

const DisplayDirectionSelector = () => {
  const [settings, dispatchSetting] = useContext(SettingsContext);

  return (
    <div className="flex rounded-md bg-slate-50 shadow-sm border border-slate-300">
      <button
        className="py-2 px-3 border-r border-slate-300 cursor-pointer"
        title="Horizontal"
        onClick={() =>
          dispatchSetting({
            type: "change_display_direction",
            payload: { direction: "horizontal" },
          })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={`w-4 fill-slate-${
            settings.displayDirection === "horizontal" ? 500 : 400
          }`}
        >
          <path d="M502.6 278.6l-96 96C400.4 380.9 392.2 384 384 384s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L402.8 288h-293.5l41.38 41.38c12.5 12.5 12.5 32.75 0 45.25C144.4 380.9 136.2 384 128 384s-16.38-3.125-22.62-9.375l-96-96c-12.5-12.5-12.5-32.75 0-45.25l96-96c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224h293.5l-41.38-41.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l96 96C515.1 245.9 515.1 266.1 502.6 278.6z" />
        </svg>
      </button>
      <button
        className="py-2 px-3 border-slate-300 cursor-pointer"
        title="Vertical"
        onClick={() =>
          dispatchSetting({
            type: "change_display_direction",
            payload: { direction: "vertical" },
          })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
          className={`w-2 fill-sl fill-slate-${
            settings.displayDirection === "vertical" ? 500 : 400
          }`}
        >
          <path d="M246.6 361.4C252.9 367.6 256 375.8 256 384s-3.125 16.38-9.375 22.62l-96 96c-12.5 12.5-32.75 12.5-45.25 0l-96-96c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L96 402.8v-293.5L54.63 150.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l96-96c12.5-12.5 32.75-12.5 45.25 0l96 96C252.9 111.6 256 119.8 256 128s-3.125 16.38-9.375 22.62c-12.5 12.5-32.75 12.5-45.25 0L160 109.3v293.5l41.38-41.38C213.9 348.9 234.1 348.9 246.6 361.4z" />
        </svg>
      </button>
    </div>
  );
};

export default DisplayDirectionSelector;
