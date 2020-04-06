import { Paper, Table as MaterialTable, TableBody, TableCell, TableRow } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setSortOrder, setSortOrderBy } from '../../../../../../../actions/delegate';
import CircularProgress from '../../../../../../../components/CircularProgress';
import NoData from '../../../../../../../components/NoData';
import '../../../../../../../components/Table/index.css';
import TableHead from '../../../../../../../components/Table/TableHead';
import price from '../../../../../../../utils/price';
import sort from '../../../../../../../utils/sort';
import DelegateButton from './DelegateButton';
import './index.css';

const ValidatorListTable = (props) => {
    const handleRequestSort = (event, property) => {
        const isDesc = props.orderBy === property && props.order === 'desc';
        const order = isDesc ? 'asc' : 'desc';
        props.setSortOrder(order);
        props.setSortOrderBy(property);
    };

    let list;
    let inProgress;

    if (props.activeList) {
        list = props.activeValidators.list;
        inProgress = props.activeValidators.inProgress;
    } else {
        list = props.inActiveValidators.list;
        inProgress = props.inActiveValidators.inProgress;
    }

    list = list && list.length > 0 && list.filter((value) => {
        if (value.description && value.description.moniker && value.description.moniker.match(props.searchValue)) {
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
                        aria-labelledby="Delegate Validator List"
                        size="medium">
                        <TableHead
                            header={props.tableHeader}
                            order={props.order}
                            orderBy={props.orderBy}
                            onRequestSort={handleRequestSort}/>
                        <TableBody>
                            {inProgress
                                ? <TableRow
                                    hover
                                    className="table_row"
                                    tabIndex={-1}>
                                    <TableCell className="table_cell no_data_cell" colSpan={5}>
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
                                                        {row.description &&
                                                        row.description.moniker &&
                                                        row.description.moniker}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        className="table_cell table_cell3">
                                                        {row.power && price(row.power)}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        className="table_cell table_cell5">
                                                        {row.commission &&
                                                        row.commission.rate &&
                                                        Math.floor(row.commission.rate * 100) + '%'}
                                                    </TableCell>
                                                    <TableCell className="table_cell table_cell7">
                                                        <DelegateButton value={row}/>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    : <TableRow
                                        hover
                                        className="table_row"
                                        tabIndex={-1}>
                                        <TableCell className="table_cell no_data_cell" colSpan={5}>
                                            <NoData/>
                                        </TableCell>
                                    </TableRow>}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={5}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </MaterialTable>
                </div>
            </Paper>
        </div>
    );
};

ValidatorListTable.propTypes = {
    activeList: PropTypes.bool.isRequired,
    activeValidators: PropTypes.object.isRequired,
    inActiveValidators: PropTypes.object.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    searchValue: PropTypes.string.isRequired,
    setSortOrder: PropTypes.func.isRequired,
    setSortOrderBy: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
};

const stateToProps = (state) => {
    return {
        activeList: state.staking.delegate.activeList,
        tableHeader: state.staking.tableHeader,
        order: state.staking.delegate.order,
        orderBy: state.staking.delegate.orderBy,
        rowsPerPage: state.staking.delegate.rowsPerPage,
        page: state.staking.delegate.page,
        activeValidators: state.staking.delegate.activeValidatorsList,
        inActiveValidators: state.staking.delegate.inActiveValidatorsList,
        searchValue: state.staking.delegate.searchList,
    };
};

const actionsToProps = {
    setSortOrder,
    setSortOrderBy,
};

export default connect(stateToProps, actionsToProps)(ValidatorListTable);
