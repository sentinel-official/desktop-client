import * as PropTypes from 'prop-types';
import React from 'react';
import { Table as ReactTable } from 'react-bootstrap';
import Header from './Header';
import './index.css';

const Table = ({
    className,
    columns,
    items,
    rowComponent,
}) => {
    return (
        <ReactTable
            borderless={true}
            className={className}>
            <Header columns={columns}/>
            <tbody>
                {
                    items.map((item, index) => (
                        rowComponent(item, index)
                    ))
                }
            </tbody>
        </ReactTable>
    );
};

Table.propTypes = {
    className: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    items: PropTypes.array.isRequired,
    rowComponent: PropTypes.func.isRequired,
};

export default Table;
