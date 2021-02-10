import Async from 'async';
import Lodash from 'lodash';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDelegations } from '../../../actions/delegations';
import { getValidators, setValidatorsSort } from '../../../actions/validators';
import Loader from '../../../components/Loader';
import Table from '../../../components/Table';
import Row from './Row';

const columns = [
    {
        id: 'moniker',
        key: 'description.moniker',
        label: 'Moniker',
        sort: true,
    },
    {
        id: 'voting_power',
        key: 'amount.value',
        label: 'Voting Power',
        sort: true,
    },
    {
        id: 'commission',
        key: 'commission.rate',
        label: 'Commission',
        sort: true,
    },
    {
        id: 'delegation',
        key: 'delegation',
        label: 'Delegation',
        sort: false,
    },
];

const Validators = ({
    delegations,
    getDelegations,
    getValidators,
    setValidatorsSort,
    sort,
    status,
    validators,
}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Async.parallel([
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

    const filteredValidators = [];
    validators.forEach((validator) => {
        if (status === 1) {
            if (validator.jailed === false && validator['bond_status'] === 'Bonded') {
                filteredValidators.push(validator);
            }
        } else {
            if (validator.jailed === true || validator['bond_status'] !== 'Bonded') {
                filteredValidators.push(validator);
            }
        }
    });

    let items = [];
    filteredValidators.forEach((validator) => {
        const delegation = Lodash.find(delegations, ['validator_address', validator.address]);
        items.push({
            ...validator,
            delegation,
        });
    });

    items = Lodash.orderBy(items, [sort.by], [sort.order]);

    const onClick = (by) => {
        const order = by === sort.by ? sort.order === 'asc' ? 'desc' : 'asc' : 'asc';
        setValidatorsSort({
            by,
            order,
        });
    };

    return (
        <div className="validators-section">
            <Table
                className="validators-table"
                columns={columns}
                items={items}
                row={Row}
                sort={sort}
                onClick={onClick}
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
    setValidatorsSort: PropTypes.func.isRequired,
    sort: PropTypes.shape({
        by: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.number.isRequired,
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
        sort: state.validators.sort,
        status: state.validators.status,
        validators: state.validators.items,
    };
};

const actionsToProps = {
    getValidators,
    getDelegations,
    setValidatorsSort,
};

export default connect(stateToProps, actionsToProps)(Validators);
