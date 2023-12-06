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
const CheckboxGroup: React.FC<Props & FieldConfig> = ({
  children,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-900 dark:text-gray-300"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <div className="w-full flex flex-wrap m-0 p-0" {...field} {...props}>
        {children}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default CheckboxGroup;
