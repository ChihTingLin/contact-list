import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  type = "button",
  children,
  onClick = () => {},
  to,
  style = "blue",
  disabled = false,
  ...rest
}) {
  const className = `${styles.wrapper} ${styles[style]} ${
    disabled ? styles.disabled : ""
  }`;
  if (to) {
    return disabled ? (
      <span className={className} {...rest}>
        {children}
      </span>
    ) : (
      <Link href={to} passHref>
        <a className={className} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
