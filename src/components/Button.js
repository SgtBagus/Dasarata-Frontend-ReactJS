import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    const {
        label, btnClass, onClick, disabled,
    } = props;


    return (
        <button
            type="button"
            className={btnClass}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
  label: PropTypes.string,
  btnClass: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
    label: 'Button',
    btnClass: 'btn btn-primary',
    disabled: false,
};

export default Button;
