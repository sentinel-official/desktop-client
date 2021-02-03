import * as PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'react-bootstrap';
import Header from './Header';
import './index.css';

const TableComponent = ({
    className,
    columns,
    rowComponent,
}) => {
    return (
        <Table borderless className={className}>
            <Header
                columns={columns}
            />
            <tbody>
                {
                    columns.map((item, index) => (
                        rowComponent(item.label, index)
                    ))
                }
            </tbody>
        </Table>
    );
};

TableComponent.propTypes = {
    className: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    rowComponent: PropTypes.func.isRequired,
};

export default TableComponent;
