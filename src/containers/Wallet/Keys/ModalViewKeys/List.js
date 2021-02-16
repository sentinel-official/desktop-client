import React from 'react';
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
const items = [
    {
        name: 'key1',
        address: 'cosmosoer01823081238012830948khasdkfasd343',
    },
    {
        name: 'key2',
        address: 'cosmosoer01823081238012830948khasdkfasd343',
    },
];

const List = () => {
    const onClick = (by) => {
    };

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
            onClick={onClick}
        />
    );
};

export default List;
