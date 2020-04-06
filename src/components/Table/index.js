import { Paper, Table as MaterialTable, TableBody, TableCell, TableRow } from '@material-ui/core';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import sort from '../../utils/sort';
import './index.css';
import TableHead from './TableHead';

class Table extends Component {
    constructor (props) {
        super(props);
        this.handleRequestSort = this.handleRequestSort.bind(this);
    }

    handleRequestSort (event, property) {
        const isDesc = this.props.orderBy === property && this.props.order === 'desc';
        const order = isDesc ? 'asc' : 'desc';
        this.props.setSortOrder(order);
        this.props.setSortOrderBy(property);
    }

    render () {
        const emptyRows = this.props.rowsPerPage - Math.min(this.props.rowsPerPage, this.props.list.length - this.props.page * this.props.rowsPerPage);

        return (
            <div className="table">
                <Paper className="paper">
                    <div className="table_div scroll_bar_div">
                        <MaterialTable
                            stickyHeader
                            aria-label="enhanced table"
                            aria-labelledby={this.props.tableName}
                            size="medium"
                        >
                            <TableHead
                                header={this.props.header}
                                order={this.props.order}
                                orderBy={this.props.orderBy}
                                onRequestSort={this.handleRequestSort}
                            />
                            <TableBody>
                                {sort(this.props.list, this.props.order, this.props.orderBy)
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                hover
                                                className="table_row"
                                                tabIndex={-1}
                                            >
                                                {Object.keys(row).map((key, index) => {
                                                    return (
                                                        <TableCell
                                                            key={index}
                                                            align="left"
                                                            className={classNames('table_cell', 'table_cell' + (index + 1))}>
                                                            {key === 'button'
                                                                ? this.props.button(row)
                                                                : key === 'icon'
                                                                    ? row[key].value &&
                                                                    <div className="image_cell">
                                                                        {row[key].image && <img
                                                                            alt={row[key].value}
                                                                            src={row[key].image}/>}
                                                                        {row[key].value}
                                                                    </div>
                                                                    : row[key]}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={this.props.list && Object.keys(this.props.list[0]).length}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </MaterialTable>
                    </div>
                </Paper>
            </div>
        );
    }
}

Table.propTypes = {
    header: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    setSortOrder: PropTypes.func.isRequired,
    setSortOrderBy: PropTypes.func.isRequired,
    tableName: PropTypes.string.isRequired,
    button: PropTypes.func,
};

export default Table;
