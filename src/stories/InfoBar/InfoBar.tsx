// InfoBar component
import "./infobar.scss";
import type { ReactNode } from "react";
import clsx from "clsx";

type InfoTypes = "info" | "warning" | "error" | "success" | "default";

export interface InfoBarProps {
  classes?: {
    root?: string;
    iconCtn?: string;
    contentCtn?: string;
  };
  infoType: InfoTypes;
  title?: string;
  children?: ReactNode;
}

// map icon names to actual icons later
const iconNames: Record<InfoTypes, string> = {
  default: "fa-solid fa-circle-info",
  info: "fa-solid fa-circle-info",
  warning: "fa-solid fa-circle-exclamation",
  error: "fa-solid fa-triangle-exclamation",
  success: "fa-solid fa-check-circle",
};

export const InfoBar = ({
  classes,
  children,
  infoType,
  title,
}: InfoBarProps) => {
  return (
    <div className={clsx("info-bar", classes?.root)}>
      <div className="info-bar__main-ctn">
        <div
          className={clsx(
            "info-bar__icon-wrapper",
            `info-bar__icon-wrapper--${infoType}`,
            classes?.iconCtn
          )}
        >
          <i className={iconNames[infoType]} />
        </div>
        <div
          className={clsx(
            "info-bar__content",
            `info-bar__content--${infoType}`,
            classes?.contentCtn
          )}
        >
          <div className="info-bar__header">{title} </div>
          <div className="info-bar__description">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
