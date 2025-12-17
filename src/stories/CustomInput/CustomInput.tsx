// CustomInput component
import { clsx } from "clsx";
import "./custom-input.scss";
import InputBase from "@mui/material/InputBase";
import type { InputBaseProps } from "@mui/material/InputBase";
export interface CustomInputProps {
  label?: string;
  InputBaseProps?: InputBaseProps;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  labelTagTitle?: string;
  isNewLabel?: boolean;
}

export const CustomInput = ({
  label = "",
  InputBaseProps,
  isRequired = false,
  isError = false,
  errorMessage = "",
  labelTagTitle = "",
  isNewLabel = false,
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
            {labelTagTitle && (
              <span
                data-testid="custom-input-label"
                className={clsx(
                  "input-header__label-tag",
                  isNewLabel && "input-header__label-tag--new"
                )}
              >
                {labelTagTitle}
              </span>
            )}
          </span>
          {isRequired && (
            <span
              className={clsx(
                "custom-input__required-label",
                isError && "custom-input__required-label--error"
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
        {...InputBaseProps}
        classes={{
          root: "custom-input__input-base-root",
          input: clsx(
            "custom-input__input",
            isError && "custom-input__input--error",
            InputBaseProps?.disabled && "custom-input__input--disabled"
          ),
        }}
      ></InputBase>
      {isError && (
        <span
          data-testid={"custom-input__error"}
          className={"custom-input__error"}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
