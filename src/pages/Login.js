import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FieldFeedback, FieldFeedbacks } from 'react-form-with-constraints';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import update from 'immutability-helper';
import axios from 'axios';

import FormValidation from '../components/FormValidation';
import InputText from '../components/Input/InputText';
import Button from '../components/Button';

import { CATCH_ERROR, GENERATE_ERROR_MESSAGE, VALIDATE_EMAIL } from './config/FormValidations';

class Login extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        form: {
            email: '',
            password: '',
        },
        isFormSubmitted: false,
      };
    }

    changeInputHandler = async (type, val, e) => {
        const { form, isFormSubmitted } = this.state;

        if (isFormSubmitted && e) {
            const onInputChangeValidate = this.form.validateInput(e.target);
            await onInputChangeValidate;
        }

        const newForm = update(form, {
            [type]: { $set: val },
        });

        this.setState({
          form: newForm,
          isFormSubmitted: true,
        });
    };

    saveActionHandler = async () => {
        const { navigate } = this.props;
        const { form: { email, password } } = this.state;
        const isFormValid = await this.form.validateForm();

        if (isFormValid) {
            const payload = {
                email,
                password,
            };

            try {
                const res = await axios.post('http://localhost:8000/api/login', payload);
                localStorage.setItem('token', res.data.token);
                navigate('/admin');
            } catch (error) {
                NotificationManager.error('Terjadi Kesalahan !', CATCH_ERROR(error), 5000);
            }
        }

        this.setState({
            isFormSubmitted: true,
        });
    }

    render() {
        const { form: { email, password } } = this.state;

        return (
            <div className="container" style={{ marginTop: '120px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <h3 className="text-center">
                                    Mohon Lakukan Login
                                </h3>
                                <hr />
                                <FormValidation ref={(c) => { this.form = c; }}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <InputText
                                                label="Masukan Email Anda"
                                                name="email"
                                                placeholder="example@example.com"
                                                value={email}
                                                changeEvent={(val, e) => this.changeInputHandler('email', val, e)}
                                                required
                                            />
                                            <FieldFeedbacks for="email">
                                                <FieldFeedback when="valueMissing">
                                                        {GENERATE_ERROR_MESSAGE('Email', 'valueMissing')}
                                                </FieldFeedback>
                                                <FieldFeedback when={val => !VALIDATE_EMAIL(val)}>
                                                    {GENERATE_ERROR_MESSAGE('Password', 'validateEmail')}
                                                </FieldFeedback>
                                            </FieldFeedbacks>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <InputText
                                                label="Masukan Password Anda"
                                                name="password"
                                                type="password"
                                                value={password}
                                                changeEvent={(val, e) => this.changeInputHandler('password', val, e)}
                                                required
                                            />
                                            <FieldFeedbacks for="password">
                                                <FieldFeedback when="valueMissing">
                                                    {GENERATE_ERROR_MESSAGE('Password', 'valueMissing')}
                                                </FieldFeedback>
                                            </FieldFeedbacks>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-sm-12">
                                            <Button
                                                label="Login"
                                                btnClass="btn btn-primary w-100"
                                                onClick={() => this.saveActionHandler()}
                                            />
                                        </div>
                                    </div>
                                </FormValidation>
                            </div>
                        </div>
                    </div>
                </div>

                <NotificationContainer />
            </div>
        );
    }
}

Login.propTypes = {
    navigate: PropTypes.func,
};

Login.defaultProps = {
    navigate: () => {},
};

export default Login;
