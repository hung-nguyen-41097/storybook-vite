// CustomInput component
import { clsx } from "clsx";
import "./custom-input.scss";
import InputBase from "@mui/material/InputBase";
import type { InputBaseProps } from "@mui/material/InputBase";
export interface CustomInputProps {
  label?: string;
  InputBaseProps?: InputBaseProps;
  required?: boolean;
  error?: string;
  isInvalid?: boolean;
  labelTag?: {
    content: string;
    newTag?: string;
  };
}

export const CustomInput = ({
  label = "",
  InputBaseProps,
  required = false,
  error,
  isInvalid = false,
  labelTag,
}: CustomInputProps) => {
  return (
    <div className={"custom-input"} data-testid={"custom-input__ctn"}>
      {label && (
        <span
          className={clsx(
            "input-header__label",
            InputBaseProps?.disabled && "input-header__label--disabled"
          )}
        >
          <span>
            {label}
            {labelTag && (
              <span
                data-testid="custom-input-label"
                className={clsx("input-header__label-tag", labelTag?.newTag)}
              >
                {labelTag.content}
              </span>
            )}
          </span>
          {required && (
            <span
              className={clsx(
                "custom-input__required-label",
                isInvalid && "custom-input__required-label--error"
              )}
            >
              *Required
            </span>
          )}
        </span>
      )}
      <InputBase
        autoComplete={"off"}
        fullWidth
        placeholder={"Input"}
        classes={{
          root: "custom-input__input-base-root",
          input: "custom-input__input",
        }}
      ></InputBase>
      {error && (
        <span
          data-testid={"custom-input__error"}
          className={"custom-input__error"}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
