import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const FormField = ({ control, label, name, Component }) => {
  return (
    <div>
      <p className="mb-1 font-bold">{label}</p>
      <Controller
        name={name}
        control={control}
        // render={({ field }) => Component({ ...field })}
        render={({ field: { onChange, value, name } }) => {
          return (
            <Component
              onChange={onChange}
              name={name}
              value={value}
              control={control}
            />
          );
        }}
      />
    </div>
  );
};

FormField.propTypes = {
  control: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  Component: PropTypes.any,
};

export default FormField;
