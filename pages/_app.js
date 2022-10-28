import "../styles/globals.css";
import { SettingsProvider } from "../context/SettingsContext";

function MyVeggieGardenApp({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}

export default MyVeggieGardenApp;
