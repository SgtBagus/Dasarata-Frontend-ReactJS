import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormWithConstraints } from 'react-form-with-constraints';

class FormValidation extends Component {
    resetForm = () => this.form.reset();

    simpleValidateForm = () => this.form.isValid();

    validateInput = async (target) => {
        await this.form.validateFields(target);
    }

    validateForm = async () => {
        const formValidatationResults = await this.form.validateForm();
        const formIsValid = this.simpleValidateForm();

        if (formIsValid) {
            return true;
        }

        try {
            formValidatationResults.forEach(({ name, validations }) => {
                if (validations) {
                    validations.forEach(({ type, show }) => {
                        if (type === 'error' && show) {
                            throw name;
                        }
                    });
                }
            });
        } catch (e) {
            const el = document.getElementsByName(e)[0];

            el.focus();
        }

        return false;
    }

    submitHandler = (e) => {
        const { onSubmit } = this.props;
        onSubmit(e);
    }

    render() {
        const { children } = this.props;

        return (
            <FormWithConstraints
                ref={(c) => { this.form = c; }}
                onSubmit={this.submitHandler}
                noValidate
            >
                {children}
            </FormWithConstraints>
        );
    }
}

FormValidation.propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func,
};

FormValidation.defaultProps = {
    children: null,
    onSubmit: () => {},
};

export default FormValidation;
