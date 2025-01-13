import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./iconButton.module.css";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: number;
}

export const IconButton = ({
  size = 20,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <button
      style={{
        width: size,
        height: size,
      }}
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  );
};
