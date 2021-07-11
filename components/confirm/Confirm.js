import Button from "../button/Button";
import styles from "./Confirm.module.css";

export default function Confirm({ message, onClickYes, onClickNo }) {
  return (
    <div className={styles.mask}>
      <div className={styles.wrapper}>
        <div className={styles.message}>{message}</div>
        <div>
          <Button style="blue-outline" onClick={onClickYes}>
            Yes
          </Button>
          <Button style="red-outline" onClick={onClickNo}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
