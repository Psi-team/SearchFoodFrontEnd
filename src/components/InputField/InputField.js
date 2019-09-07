import React from 'react';
import PropTypes from 'prop-types';

import './InputField.scss';

const InputField = ({
  classname = '',
  displayName = '',
  style = {},
  value,
  handleChange,
  name,
  placeholder = '',
  required = false
}) => (
    <label className={`inputField ${classname}`}>
      <span>
        {displayName}
      </span>
      <input
        type={name === 'password' ? 'password' : 'text'}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        style={{
          ...style
        }}
      />
    </label>
  );

InputField.propTypes = {
  className: PropTypes.string,
  displayName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  required: PropTypes.bool
};

export default InputField;