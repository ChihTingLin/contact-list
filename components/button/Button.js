import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  type = "button",
  children,
  onClick = () => {},
  to,
  style = "blue",
  ...rest
}) {
  if (to) {
    return (
      <Link href={to} passHref>
        <a className={`${styles.wrapper} ${styles[style]}`} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={`${styles.wrapper} ${styles[style]}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
