import React from "react";
import { FieldConfig, useField } from "formik";
import { classNames } from "../../../utils/classNames";

type Item = {
  value: string;
  label: string;
};

type Props = {
  items: Item[];
  children?: React.ReactNode;
  label?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  size?: "normal" | "small" | "large";
};

enum Size {
  Normal = "normal",
  Small = "small",
  Large = "large",
}

const SizeMap = {
  [Size.Large]: "w-full p-2.5",
  [Size.Small]: "w-24 p-1",
  [Size.Normal]: "w-64",
};

// Follow the Formik document
const Select: React.FC<Props & FieldConfig> = ({
  items,
  label,
  size = "large",
  disabled = false,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="mr-3">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        disabled={disabled}
        // className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...field}
        {...props}
        className={classNames(
          "mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          SizeMap[size]
        )}
      >
        {items.map((item) => (
          <option value={item.value}>{item.label}</option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default Select;
