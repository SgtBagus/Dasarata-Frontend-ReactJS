import React from 'react';
import PropTypes from 'prop-types';

const AdminHeader = (props) => {
  const { logoutHanlder } = props;

  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="#">
        Halaman Admin
      </a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/admin">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/product">
              Product
            </a>
          </li>
        </ul>
        <button
          type="button"
          onClick={logoutHanlder}
          className="btn btn-md btn-danger"
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

AdminHeader.propTypes = {
  logoutHanlder: PropTypes.func,
};

AdminHeader.defaultProps = {
  logoutHanlder: () => {},
};


export default AdminHeader;
