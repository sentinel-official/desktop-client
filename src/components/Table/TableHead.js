import { TableCell, TableHead as MaterialTableHead, TableRow, TableSortLabel } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as PropTypes from 'prop-types';
import React from 'react';

const TableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <MaterialTableHead>
            <TableRow>
                {props.header.map((cell) => (
                    <TableCell
                        key={cell.id}
                        align="left"
                        padding="default"
                        sortDirection={orderBy === cell.id ? order : false}
                    >
                        {cell.sort
                            ? <TableSortLabel
                                active={orderBy === cell.id}
                                className={
                                    'table_sort ' + (orderBy === cell.id ? 'active_sort' : '')
                                }
                                direction={order}
                                IconComponent={ArrowDropDownIcon}
                                onClick={createSortHandler(cell.id)}
                            >
                                {cell.label}
                            </TableSortLabel>
                            : cell.label}
                    </TableCell>
                ))}
            </TableRow>
        </MaterialTableHead>
    );
};

TableHead.propTypes = {
    header: PropTypes.array.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
};

export default TableHead;
