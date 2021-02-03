import React from 'react';
import TableComponent from '../../../components/Table';
import Row from './Row';

const Validators = () => {
    const columns = [{
        label: 'Moniker',
    }, {
        label: 'Voting Power',
    }, {
        label: 'Self',
    }, {
        label: 'Commission',
    }, {
        label: 'Uptime',
    }];
    return (
        <TableComponent
            className="validators-table"
            columns={columns}
            rowComponent={Row}
        />
    );
};

export default Validators;
