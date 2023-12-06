import React from "react";
import { FieldConfig, useField } from "formik";
import { classNames } from "../../../utils/classNames";

type Props = {
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
  [Size.Small]: "w-48 p-1",
  [Size.Normal]: "w-64",
};

// Follow the Formik document
const Input: React.FC<Props & FieldConfig> = ({
  label,
  size = "large",
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        autoFocus
        // className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...field}
        {...props}
        className={classNames(
          "mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          SizeMap[size]
        )}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};

export default Input;
