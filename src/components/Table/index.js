import * as PropTypes from 'prop-types';
import React from 'react';
import { Table as ReactTable } from 'react-bootstrap';
import Header from './Header';
import './index.css';

const Table = ({
    className,
    columns,
    rowComponent,
}) => {
    return (
        <ReactTable borderless className={className}>
            <Header columns={columns}/>
            <tbody>
            {
                columns.map((item, index) => (
                    rowComponent(item.label, index)
                ))
            }
            </tbody>
        </ReactTable>
    );
};

Table.propTypes = {
    className: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    rowComponent: PropTypes.func.isRequired,
};

export default Table;
