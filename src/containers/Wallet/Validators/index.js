import Async from 'async';
import Lodash from 'lodash';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDelegations } from '../../../actions/delegations';
import { getValidators } from '../../../actions/validators';
import Table from '../../../components/Table';
import Loader from '../../../components/Loader';
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
    {
        label: 'Shares',
        id: 'shares',
    },
];

const Validators = ({
    delegations,
    getDelegations,
    getValidators,
    validators,
}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Async.waterfall([
            (next) => {
                getValidators(next);
            }, (next) => {
                getDelegations(next);
            },
        ], () => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loader/>;
    }

    let items = [];
    validators.forEach((validator) => {
        const delegation = Lodash.find(delegations, ['validator_address', validator.address]);
        items.push({
            ...validator,
            delegation,
        });
    });

    items = Lodash.orderBy(items, ['amount.value'], ['desc']);

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
    delegations: PropTypes.arrayOf(
        PropTypes.shape({
            validator_address: PropTypes.string.isRequired,
            shares: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    getDelegations: PropTypes.func.isRequired,
    getValidators: PropTypes.func.isRequired,
    validators: PropTypes.arrayOf(
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
            index: PropTypes.number.isRequired,
            jailed: PropTypes.bool.isRequired,
        }).isRequired,
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        delegations: state.delegations.items,
        validators: state.validators.items,
    };
};

const actionsToProps = {
    getValidators,
    getDelegations,
};

export default connect(stateToProps, actionsToProps)(Validators);
