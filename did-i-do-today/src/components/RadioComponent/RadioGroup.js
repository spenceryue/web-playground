import React from 'react';
import classNames from 'classnames';

const InputFeedback = ({ error }) =>
  error ? <div className={classNames('input-feedback')}>{error}</div> : null;

const RadioGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classNames(
    'input-field',
    {
      'is-success': value || (!error && touched),
      'is-error': !!error && touched
    },
    className
  );

  return (
    <div className={classes}>
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};

export default RadioGroup;
