import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Table from '../../components/Table/index';

import { CATCH_ERROR } from '../config/FormValidations';

export default class Product extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        data: null,
      };
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = async () => {
        const token = localStorage.getItem('token');

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        try {
            const { data: { data: { data: dataList } } } = await axios.get('http://127.0.0.1:8000/api/produtcs', config);
            this.setState({
                data: dataList,
            });
        } catch (error) {
            NotificationManager.error('Terjadi Kesalahan !', CATCH_ERROR(error), 5000);
        }
    }

    renderTable = (data) => {
        const dataList = data.map((x, idx) => {
            const key = `key-tabel-${idx}`;
            return (
                <tr key={key}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>
                        <img
                            src={x.attachement}
                            alt="img"
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                            }}
                        />
                    </td>
                    <td>{x.desc}</td>
                    <td>
                        Rp.
                        {' '}
                        {x.price}
                    </td>
                    <td>
                        <div className="row">
                            <div className="col-md-12">
                                <button
                                    type="button"
                                    onClick={() => this.editHandel(x.id)}
                                    className="btn btn-md btn-primary w-100 my-2"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="col-md-12">
                                <button
                                    type="button"
                                    onClick={() => this.deleteHandel(x.id)}
                                    className="btn btn-md btn-danger w-100 my-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        });

        return dataList;
    }

    createHandel = () => {
        const { navigate } = this.props;
        navigate('/admin/product/create');
    }

    render() {
        const { data } = this.state;

        return (
            <div className="card border-0 rounded shadow-sm">
                <div className="card-body">
                    <div className="row justify-content-end">
                        <div className="col-md-4">
                            <button
                                type="button"
                                onClick={() => this.createHandel()}
                                className="btn btn-md btn-primary w-100 my-2"
                            >
                                Buat Product
                            </button>
                        </div>
                    </div>
                    {
                        data && (
                            <Table
                                column={[
                                    'Id', 'Name', 'Image', 'Desc', 'Price', 'Action',
                                ]}
                                data={this.renderTable(data)}
                            />
                        )
                    }
                </div>
                <NotificationContainer />
            </div>
        );
    }
}

Product.propTypes = {
    navigate: PropTypes.func,
};

Product.defaultProps = {
    navigate: () => {},
};
