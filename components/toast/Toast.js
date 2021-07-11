import { useEffect, useState, createContext, useCallback } from "react";
import styles from "./Toast.module.css";

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addToast = useCallback(
    (toast) => {
      setToast(toast);
    },
    [setToast]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className={`${styles.container} ${!toast ? styles.hidden : ""}`}>
        <div className={`${styles.wrapper} ${toast ? styles[toast.type] : ""}`}>
          {toast ? toast.message : " "}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
