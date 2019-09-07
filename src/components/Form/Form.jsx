import React from 'react';
import PropTypes from 'prop-types';

import './Form.scss';

const Form = ({ className = '', validFunc, error, errorMsg, children }) => (
  <form
    className={`form ${className}`}
    onSubmit={(e) => validFunc(e)}
  >
    <span>
      {error && errorMsg}
    </span>
    {children}
  </form>
);

Form.propTypes = {
  className: PropTypes.string,
  validFunc: PropTypes.func,
  error: PropTypes.string.isRequired,
  errorMsg: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Form;