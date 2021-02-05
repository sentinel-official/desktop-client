import React from 'react';
import Table from '../../../components/Table';
import Row from './Row';

const Validators = () => {
    const columns = [
        {
            label: 'Moniker',
        },
        {
            label: 'Voting Power',
        },
        {
            label: 'Self',
        },
        {
            label: 'Commission',
        },
        {
            label: 'Uptime',
        },
    ];

    return (
        <Table
            className="validators-table"
            columns={columns}
            rowComponent={Row}
        />
    );
};

export default Validators;
