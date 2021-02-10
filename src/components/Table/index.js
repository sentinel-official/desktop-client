import './index.css';
import * as PropTypes from 'prop-types';
import { Table as ReactTable } from 'react-bootstrap';
import Header from './Header';
import React from 'react';

const Table = ({
    className,
    columns,
    items,
    onClick,
    sort,
    row: Component,
}) => {
    return (
        <ReactTable
            borderless={true}
            className={className}>
            <Header
                columns={columns}
                sort={sort}
                onClick={onClick}
            />
            <tbody>
                {
                    items.map((item, index) => {
                        return (
                            <Component
                                key={index}
                                item={item}
                            />
                        );
                    })
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
    row: PropTypes.object.isRequired,
    sort: PropTypes.shape({
        by: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Table;
