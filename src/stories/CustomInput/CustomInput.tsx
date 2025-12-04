// CustomInput component
import styles from "./custom-input.scss";
import InputBase from "@mui/material/InputBase";

export interface CustomInputProps {
  /** Optional label/content */
  label?: string;
  /** Optional children */
  children?: React.ReactNode;
  /** Optional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Optional click handler */
  onClick?: () => void;
}

export const CustomInput = ({
  label,
  children,
  className = "",
  style,
  onClick,
}: CustomInputProps) => {
  const content = label ?? children ?? null;
  return (
    <InputBase
      autoComplete={"off"}
      fullWidth
      placeholder={"Input"}
      classes={{
        root: styles["pulse-input__inputBaseRoot"],
        input: styles["pulse-input__input"],
      }}
    ></InputBase>
  );
};

export default CustomInput;
