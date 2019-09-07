import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ className = '', displayName, handleClick, type = 'button' }) => (
  <button
    type={type}
    className={`button ${className}`}
    onClick={handleClick}
  >
    {displayName}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  displayName: PropTypes.string,
  handleClick: PropTypes.func
};

export default Button;
