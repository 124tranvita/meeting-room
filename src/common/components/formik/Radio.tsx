import React from "react";
import { FieldConfig, useField } from "formik";

type Props = {
  children?: React.ReactNode;
  label?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
};

const Radio: React.FC<Props & FieldConfig> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "radio" });

  return (
    <div>
      <label className="block text-md font-medium text-gray-900 dark:text-gray-300">
        <input type="radio" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Radio;
