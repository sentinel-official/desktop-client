import { Paper, Table as MaterialTable, TableBody, TableCell, TableRow } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setSortOrder, setSortOrderBy } from '../../../../../../../actions/unBond';
import CircularProgress from '../../../../../../../components/CircularProgress';
import NoData from '../../../../../../../components/NoData';
import TableHead from '../../../../../../../components/Table/TableHead';
import price from '../../../../../../../utils/price';
import sort from '../../../../../../../utils/sort';
import '../../Delegate/Table/index.css';
import UnBondButton from './UnBondButton';

const unBondTable = (props) => {
    const handleRequestSort = (event, property) => {
        const isDesc = props.orderBy === property && props.order === 'desc';
        const order = isDesc ? 'asc' : 'desc';
        props.setSortOrder(order);
        props.setSortOrderBy(property);
    };
    let list = props.validatorsList;
    list = list && list.length > 0 && list.filter((value) => {
        if (value.validator &&
            value.validator.description &&
            value.validator.description.moniker &&
            value.validator.description.moniker.match(props.searchValue)) {
            return value;
        } else {
            return null;
        }
    });

    const emptyRows = props.rowsPerPage - Math.min(
        props.rowsPerPage, list && list.length - props.page * props.rowsPerPage);

    return (
        <div className="table">
            <Paper className="paper">
                <div className="table_div scroll_bar_div">
                    <MaterialTable
                        stickyHeader
                        aria-label="enhanced table"
                        aria-labelledby="Re-Delegate Validator List"
                        size="medium">
                        <TableHead
                            header={props.tableHeader}
                            order={props.order}
                            orderBy={props.orderBy}
                            onRequestSort={handleRequestSort}/>
                        <TableBody>
                            {props.inProgress
                                ? <TableRow
                                    hover
                                    className="table_row"
                                    tabIndex={-1}>
                                    <TableCell className="table_cell no_data_cell" colSpan={4}>
                                        <CircularProgress/>
                                    </TableCell>
                                </TableRow>
                                : list && list.length > 0
                                    ? sort(list, props.order, props.orderBy)
                                        .map((row, index) => {
                                            return (
                                                <TableRow
                                                    key={index}
                                                    hover
                                                    className="table_row"
                                                    tabIndex={-1}>
                                                    <TableCell
                                                        align="left"
                                                        className="table_cell table_cell1"
                                                        scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        className="table_cell table_cell2">
                                                        {row.validator &&
                                                        row.validator.description &&
                                                        row.validator.description.moniker &&
                                                        row.validator.description.moniker}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        className="table_cell table_cell3">
                                                        {row.shares &&
                                                        price((Math.round(
                                                            (row.validator && row.validator.amount && row.validator.amount.value) /
                                                            (row.validator && row.validator.delegator_shares) * row.shares) *
                                                            Math.pow(10, -6)).toFixed(6))}
                                                    </TableCell>
                                                    <TableCell className="table_cell table_cell7">
                                                        <UnBondButton value={row}/>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    : <TableRow
                                        hover
                                        tabIndex={-1}>
                                        <TableCell className="table_cell no_data_cell" colSpan={4}>
                                            <NoData/>
                                        </TableCell>
                                    </TableRow>}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={7}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </MaterialTable>
                </div>
            </Paper>
        </div>
    );
};

unBondTable.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    searchValue: PropTypes.string.isRequired,
    setSortOrder: PropTypes.func.isRequired,
    setSortOrderBy: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    validatorsList: PropTypes.array,
};

const stateToProps = (state) => {
    return {
        tableHeader: state.staking.reDelegate.tableHeader,
        order: state.staking.unBond.order,
        orderBy: state.staking.unBond.orderBy,
        rowsPerPage: state.staking.unBond.rowsPerPage,
        page: state.staking.unBond.page,
        validatorsList: state.staking.delegationsValidators.list,
        inProgress: state.staking.delegationsValidators.inProgress,
        searchValue: state.staking.unBond.searchList,
    };
};

const actionsToProps = {
    setSortOrder,
    setSortOrderBy,
};

export default connect(stateToProps, actionsToProps)(unBondTable);
