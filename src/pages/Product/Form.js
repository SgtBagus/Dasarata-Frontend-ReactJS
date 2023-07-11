import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FieldFeedback, FieldFeedbacks } from 'react-form-with-constraints';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import update from 'immutability-helper';

import FormValidation from '../../components/FormValidation';
import InputText from '../../components/Input/InputText';
import Button from '../../components/Button';

import { CATCH_ERROR, GENERATE_ERROR_MESSAGE } from '../config/FormValidations';

export default class Form extends PureComponent {
    static dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      let byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0) { byteString = atob(dataURI.split(',')[1]); } else { byteString = unescape(dataURI.split(',')[1]); }

      // separate out the mime component
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    }

    constructor(props) {
      super(props);

      this.state = {
        form: {
            name: '',
            img: '',
            desc: '',
            price: '',
        },
        isFormSubmitted: false,
        fileUpload: '',
      };
    }

    componentDidMount = () => {
        // this.getData();
    }

    // getData = async () => {
    //     console.log('getDataDetails');
    // }

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

    _handleFile = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        if (!file) return;

        reader.onload = (e) => {
          const dataURI = e.target.result;
          this.processUploadData(dataURI);
        };
        reader.readAsDataURL(file);
    }

    processUploadData = (dataURI) => {
        const fileUpload = this.constructor.dataURItoBlob(dataURI);

        this.setState({
            fileUpload,
        });
    }

    saveActionHandler = async () => {
        const {
            form: {
                name, desc, price,
            },
            fileUpload,
        } = this.state;

        const isFormValid = await this.form.validateForm();

        const token = localStorage.getItem('token');

        if (isFormValid) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'multipart/form-data',
                        'Content-Type': 'multipart/form-data',
                    },
                };


                const formdata = new FormData();
                formdata.append('name', name);
                formdata.append('desc', desc);
                formdata.append('price', price);
                // formdata.append('attachment', fileUpload);

                await axios.post('http://127.0.0.1:8000/api/produtcs', formdata, config);

                NotificationManager.success('Berhasil Menyimpan Data !', '', 5000);
            } catch (error) {
                NotificationManager.error('Terjadi Kesalahan !', CATCH_ERROR(error), 5000);
            }
        }

        this.setState({
            isFormSubmitted: true,
        });
    }

    backHandler = () => {
        const { navigate } = this.props;

        navigate('/admin/product');
    }

    render() {
        const {
            form: {
                name, desc, price,
            },
        } = this.state;

        return (
            <div className="container" style={{ marginTop: '120px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <h3 className="text-center">
                                    Form Product
                                </h3>
                                <hr />
                                <FormValidation ref={(c) => { this.form = c; }}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <InputText
                                                label="Masukan Nama Product Anda"
                                                name="name"
                                                value={name}
                                                changeEvent={(val, e) => this.changeInputHandler('name', val, e)}
                                                required
                                            />
                                            <FieldFeedbacks for="name">
                                                <FieldFeedback when="valueMissing">
                                                        {GENERATE_ERROR_MESSAGE('Nama Product', 'valueMissing')}
                                                </FieldFeedback>
                                            </FieldFeedbacks>
                                        </div>
                                        <div className="col-sm-6">
                                            <InputText
                                                label="Masukan Harga Product Anda"
                                                name="price"
                                                type="number"
                                                value={price}
                                                changeEvent={(val, e) => this.changeInputHandler('price', val, e)}
                                                required
                                            />
                                            <FieldFeedbacks for="price">
                                                <FieldFeedback when="valueMissing">
                                                        {GENERATE_ERROR_MESSAGE('Harga Product', 'valueMissing')}
                                                </FieldFeedback>
                                            </FieldFeedbacks>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input
                                                type="file"
                                                className="my-2"
                                                onChange={e => this._handleFile(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <InputText
                                                label="Masukan Desc Anda"
                                                name="desc"
                                                value={desc}
                                                changeEvent={(val, e) => this.changeInputHandler('desc', val, e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-sm-6">
                                            <Button
                                                label="Cancel"
                                                btnClass="btn btn-secondary w-100"
                                                onClick={() => this.backHandler()}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <Button
                                                label="Save"
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

Form.propTypes = {
    navigate: PropTypes.func,
};

Form.defaultProps = {
    navigate: () => {},
};
