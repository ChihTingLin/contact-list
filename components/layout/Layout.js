import Link from "next/link";
// import { ToastContextProvider } from "../toast/Toast";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    
      <div>
        <header className={styles.header}>
          <h2>
            <Link href="/">Contact List</Link>
          </h2>
        </header>
        <div className={styles.container}>{children}</div>
      </div>
    
  );
}
