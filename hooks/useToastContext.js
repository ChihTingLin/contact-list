import { useContext } from "react";
import ToastContext from "../components/toast/Toast";

export default function useToastContext() {
  return useContext(ToastContext);
}
