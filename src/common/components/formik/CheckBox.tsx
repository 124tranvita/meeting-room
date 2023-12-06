import React from "react";
import { FieldConfig, useField } from "formik";

type Props = {
  children?: React.ReactNode;
  label?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
};

// Follow the Formik document
const Checkbox: React.FC<Props & FieldConfig> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex items-center mb-3">
      <input
        type="checkbox"
        autoFocus
        // className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...field}
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <label
        htmlFor={props.id || props.name}
        className="ml-3 text-sm font-semibold text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Checkbox;
