import React from 'react'

const InputTextField = ({ name, placeholder, required, _handleChange }) => (
  <div>
    <input
      type='text'
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={_handleChange}
    />
  </div>
);

export default InputTextField;
