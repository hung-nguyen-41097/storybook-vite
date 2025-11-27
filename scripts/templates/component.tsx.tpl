// {{NAME}} component
import "./{{kebab}}.scss";

export interface {{NAME}}Props {
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

export const {{NAME}} = ({
  label,
  children,
  className = "",
  style,
  onClick,
}: {{NAME}}Props) => {
  const content = label ?? children ?? null;
  return (
    <div
      role="region"
      className={["storybook-{{kebab}}", className].join(" ")}
      style={style}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default {{NAME}};
