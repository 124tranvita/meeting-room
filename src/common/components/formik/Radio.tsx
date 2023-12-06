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
const Radio: React.FC<Props & FieldConfig> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "radio" });
  return (
    <div className="my-3">
      <label className="text-sm text-gray-900 dark:text-gray-300">
        <div className="flex items-center">
          <input
            type="radio"
            {...field}
            {...props}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <span className="ml-3">{children}</span>
        </div>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Radio;
