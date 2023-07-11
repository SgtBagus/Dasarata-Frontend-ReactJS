import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => {
    const { column, data } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    {
                        column.map((x, idx) => {
                            const key = `key-coloumn-${idx}`;
                            return (
                                <th key={key} scope="col">{x}</th>
                            );
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    column: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
};

export default Table;
