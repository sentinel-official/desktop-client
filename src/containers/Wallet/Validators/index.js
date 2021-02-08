import React from 'react';
import Table from '../../../components/Table';
import Row from './Row';

const Validators = () => {
    const columns = [
        {
            label: 'Moniker',
            id: 'Moniker',
        },
        {
            label: 'Voting Power',
            id: 'Voting Power',
        },
        {
            label: 'Self',
            id: 'Self',
        },
        {
            label: 'Commission',
            id: 'Commission',
        },
        {
            label: 'Uptime',
            id: 'Uptime',
        },
    ];

    return (
        <div className="validators-section">
            <Table
                className="validators-table"
                columns={columns}
                items={columns}
                rowComponent={Row}
            />
        </div>
    );
};

export default Validators;
