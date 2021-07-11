import Image from "next/image";
import Button from "../button/Button";
import styles from "./Card.module.css";

export default function Card({ id, first_name, last_name, job, description }) {
  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          <Image src="/user.svg" width={30} height={30} />
          <span className={styles.name}> {`${first_name} ${last_name}`}</span>
        </div>
        <div>
          {`Job: ${job}`}
          <br />
          {`Description: ${description}`}
        </div>
      </div>
      <div className={styles.actions}>
        <Button to={`/edit/${id}`}>Edit</Button>
        <Button style="red-outline" id={id}>
          Remove
        </Button>
      </div>
    </div>
  );
}
