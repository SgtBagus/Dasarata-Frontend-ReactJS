import React from 'react';
import PropTypes from 'prop-types';

const InputText = (props) => {
    const {
        type, label, value, classes, name, changeEvent, placeholder, required, disabled, maxlength, readonly, title, spellCheck, maxLengthCounter,
    } = props;

    let inputStyleClass = 'form-control';

    if (classes) {
        inputStyleClass = `${inputStyleClass} ${classes}`;
    }

    return (
        <div className="my-1">
            {label && (
                <div className="row">
                    <div className={(maxLengthCounter && maxlength) ? 'col-xs-6' : 'col-xs-12'}>
                        <label>{label}</label>
                    </div>
                    {(maxLengthCounter && maxlength) && (
                        <div className="col-xs-6 text-right">
                            <label>{`${value.length}/${maxlength}`}</label>
                        </div>
                    )}
                </div>
            )}
            <input
                type={type}
                className={inputStyleClass}
                name={name}
                onChange={e => changeEvent(e.target.value, e)}
                placeholder={placeholder}
                value={value}
                required={!!required}
                disabled={disabled}
                maxLength={maxlength}
                readOnly={readonly}
                title={title}
                spellCheck={spellCheck}
                autoComplete="off"
            />
        </div>
    );
};

InputText.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    classes: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    maxlength: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    changeEvent: PropTypes.func,
    required: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    disabled: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    readonly: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    title: PropTypes.string,
    spellCheck: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    maxLengthCounter: PropTypes.bool,
};

InputText.defaultProps = {
    type: 'text',
    label: '',
    classes: undefined,
    name: undefined,
    placeholder: '',
    maxlength: '',
    changeEvent: () => {},
    required: false,
    disabled: false,
    readonly: false,
    title: '',
    spellCheck: false,
    maxLengthCounter: false,
};

export default InputText;
