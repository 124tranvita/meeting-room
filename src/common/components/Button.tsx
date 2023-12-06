import React, { ButtonHTMLAttributes } from "react";
import { classNames } from "../../utils/classNames";

enum Variant {
  Primary = "primary",
  Success = "success",
  Danger = "danger",
}

const VariantMap = {
  [Variant.Primary]: "bg-blue-100 text-blue-900 hover:bg-blue-200",
  [Variant.Success]: "bg-green-100 text-green-900 hover:bg-green-200",
  [Variant.Danger]: "bg-red-100 text-red-900 hover:bg-red-200",
};

//   const Disabled = "bg-slate-200 text-slate-400 hover:bg-slate-200";

type ButtonProps = {
  label?: string | React.ReactNode;
  variant: "primary" | "success" | "danger";
  onClick?: () => void;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  variant,
  disabled = false,
  onClick,
}) => {
  return (
    <div className="mt-4 mr-4">
      <button
        type={type}
        className={classNames(
          "inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          VariantMap[variant],
          `${disabled ? "bg-slate-200 hover:bg-slate-200 text-slate-400" : ""}`
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

Button.defaultProps = {
  variant: Variant.Primary,
};
