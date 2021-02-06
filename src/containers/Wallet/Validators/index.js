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
