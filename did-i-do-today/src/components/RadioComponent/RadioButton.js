import React from 'react';
import classNames from 'classnames';

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  presetValue,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type='radio'
        value={presetValue}
        checked={
          value === presetValue
        }
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('radio-button')}
        {...props}
      />
      <label
        htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
