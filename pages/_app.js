import "../styles/globals.css";
import { ToastContextProvider } from "../components/toast/Toast";

function MyApp({ Component, pageProps }) {
  return (
    <ToastContextProvider>
      <Component {...pageProps} />
    </ToastContextProvider>
  );
}

export default MyApp;
