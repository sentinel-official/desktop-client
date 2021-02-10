import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from './Avatar';
import Delegate from './Delegate';
import React from 'react';
import Redelegate from './Redelegate';
import Unbond from './Unbond';

const Row = ({
    action,
    item,
    totalVotingPower,
}) => {
    const active = item.jailed === false && item['bond_status'] === 'Bonded';

    let votingPower = item.amount.value * Math.pow(10, -6);
    let votingPowerPercentage = item.amount.value * 100 / totalVotingPower;
    let commissionRate = item.commission.rate * 100;
    let delegation = item.delegation ? item.amount.value * parseFloat(item.delegation.shares) : 0;
    delegation = (delegation / parseFloat(item['delegator_shares'])) * Math.pow(10, -6);

    votingPower = parseFloat(votingPower.toFixed(2)).toLocaleString();
    votingPowerPercentage = parseFloat(votingPowerPercentage.toFixed(2)).toLocaleString();
    commissionRate = parseFloat(commissionRate.toFixed(2)).toLocaleString();
    delegation = parseFloat(delegation.toFixed(2)).toLocaleString();

    return (
        <tr key={item.index}>
            <td className="flex-center">
                <div className="serial">
                    {item.index + 1}
                </div>
                <Avatar identity={item.description.identity}/>
            </td>
            <td>
                {item.description.moniker}
            </td>
            <td>
                {`${votingPower} (${votingPowerPercentage}%)`}
            </td>
            <td>
                {commissionRate}%
            </td>
            <td>
                {delegation}
            </td>
            <td>
                {active === true && action === 0 ? <Delegate to={item.address}/> : null}
                {active === true && action === 1 ? <Redelegate from={item.address}/> : null}
                {active === true && action === 2 ? <Unbond from={item.address}/> : null}
                {active === false && action === 0 ? <Redelegate from={item.address}/> : null}
                {active === false && action === 1 ? <Unbond from={item.address}/> : null}
            </td>
        </tr>
    );
};

Row.propTypes = {
    action: PropTypes.number.isRequired,
    item: PropTypes.shape({
        address: PropTypes.string.isRequired,
        amount: PropTypes.shape({
            value: PropTypes.number.isRequired,
        }).isRequired,
        bond_status: PropTypes.string.isRequired,
        commission: PropTypes.shape({
            rate: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
        }).isRequired,
        delegation: PropTypes.shape({
            shares: PropTypes.string.isRequired,
        }),
        delegator_shares: PropTypes.string.isRequired,
        description: PropTypes.shape({
            identity: PropTypes.string.isRequired,
            moniker: PropTypes.string.isRequired,
            website: PropTypes.string.isRequired,
        }).isRequired,
        index: PropTypes.number.isRequired,
        jailed: PropTypes.bool.isRequired,
    }).isRequired,
    totalVotingPower: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        action: state.validators.action,
        totalVotingPower: state.validators.totalVotingPower,
    };
};

export default connect(stateToProps)(Row);
