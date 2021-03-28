import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emptyFunc } from '../../../../constants/common';
import { getKeys } from '../../../../actions/keys';
import React, { useEffect } from 'react';
import Row from './Row';
import Table from './../../../../components/Table';

const columns = [
    {
        id: '',
        key: '',
        label: '',
        sort: false,
    },
    {
        id: 'name',
        key: 'name',
        label: 'Name',
        sort: false,
    },
    {
        id: 'address',
        key: 'address',
        label: 'Address',
        sort: false,
    },
    {
        id: '',
        key: '',
        label: '',
        sort: false,
    },
    {
        id: '',
        key: '',
        label: '',
        sort: false,
    },
];

const List = ({
    items,
    getKeys,
}) => {
    useEffect(() => {
        getKeys();
    }, []);

    items.forEach((item, index) => {
        item.index = index;
    });

    return (
        <Table
            className="keys-table"
            columns={columns}
            items={items}
            row={Row}
            sort={{
                by: 'none',
                order: 'none',
            }}
            onClick={emptyFunc}
        />
    );
};

List.propTypes = {
    getKeys: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
        }),
    ),
};

const stateToProps = (state) => {
    return {
        items: state.keys.items,
    };
};

const actionsToProps = {
    getKeys,
};

export default connect(stateToProps, actionsToProps)(List);
