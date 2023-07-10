import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import AdminHeader from './components/AdminHeader';

const token = localStorage.getItem('token');

const logoutHanlder = async (navigate) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await axios.post('http://127.0.0.1:8000/api/logout').then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    });
};

const Layout = (props) => {
    const { children } = props;

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="container" style={{ marginTop: '20px' }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <AdminHeader logoutHanlder={() => { logoutHanlder(navigate); }} />
                    {children}
                </div>
            </div>
        </div>
    );
};

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
