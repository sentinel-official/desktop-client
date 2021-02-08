import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getValidators } from '../../../actions/validators';
import Table from '../../../components/Table';
import Row from './Row';

const columns = [
    {
        label: 'Moniker',
        id: 'moniker',
    },
    {
        label: 'Voting Power',
        id: 'voting_power',
    },
    {
        label: 'Commission',
        id: 'commission',
    },
];

const Validators = ({
    getValidators,
    items,
}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getValidators((error) => {
            if (error) {
                return;
            }

            setLoading(false);
        });
    }, []);

    if (loading) {
        return <span>Loading</span>;
    }

    return (
        <div className="validators-section">
            <Table
                className="validators-table"
                columns={columns}
                items={items}
                row={Row}
            />
        </div>
    );
};

Validators.propTypes = {
    getValidators: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
            amount: PropTypes.shape({
                value: PropTypes.number.isRequired,
            }).isRequired,
            bond_status: PropTypes.string.isRequired,
            commission: PropTypes.shape({
                rate: PropTypes.string.isRequired,
                updated_at: PropTypes.string.isRequired,
            }).isRequired,
            description: PropTypes.shape({
                identity: PropTypes.string.isRequired,
                moniker: PropTypes.string.isRequired,
                website: PropTypes.string.isRequired,
            }).isRequired,
            jailed: PropTypes.bool.isRequired,
        }).isRequired,
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        items: state.validators.items,
    };
};

const actionsToProps = {
    getValidators,
};

export default connect(stateToProps, actionsToProps)(Validators);
