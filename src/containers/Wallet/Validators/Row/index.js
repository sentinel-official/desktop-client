import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isActive } from '../../../../utils/validator';
import Avatar from './Avatar';
import Delegate from './Delegate';
import React from 'react';
import Redelegate from './Redelegate';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Unbond from './Unbond';

const Row = ({
    item,
    totalVotingPower,
}) => {
    const active = isActive(item);

    let votingPower = item.amount.value * Math.pow(10, -6);
    let votingPowerPercentage = active
        ? item.amount.value * 100 / totalVotingPower.active
        : item.amount.value * 100 / totalVotingPower.inactive;

    let commissionRate = item.commission.rate * 100;
    let delegation = item.delegation ? item.amount.value * parseFloat(item.delegation.shares) : 0;
    delegation = (delegation / parseFloat(item['delegator_shares'])) * Math.pow(10, -6);

    votingPower = parseFloat(votingPower.toFixed(2)).toLocaleString();
    votingPowerPercentage = parseFloat(votingPowerPercentage.toFixed(2)).toLocaleString();
    commissionRate = parseFloat(commissionRate.toFixed(2)).toLocaleString();
    delegation = parseFloat(delegation.toFixed(2)).toLocaleString();

    return (
        <TableRow key={item.index}>
            <TableCell className="">
                <div className="flex-center">
                    <div className="serial">
                        {item.index + 1}
                    </div>
                    <Avatar identity={item.description.identity}/>
                </div>
            </TableCell>
            <TableCell>
                <a
                    href={item.description.website}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {item.description.moniker}
                </a>
            </TableCell>
            <TableCell>
                {`${votingPower} (${votingPowerPercentage}%)`}
            </TableCell>
            <TableCell>
                {commissionRate}%
            </TableCell>
            <TableCell>
                {delegation}
            </TableCell>
            <TableCell>
                {item.jailed === false ? <Delegate to={item.address}/> : null}
                {item.delegation?.shares ? <Redelegate from={item.address}/> : null}
                {item.delegation?.shares ? <Unbond from={item.address}/> : null}
            </TableCell>
        </TableRow>
    );
};

Row.propTypes = {
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
    totalVotingPower: PropTypes.shape({
        active: PropTypes.number.isRequired,
        inactive: PropTypes.number.isRequired,
    }).isRequired,
};

const stateToProps = (state) => {
    return {
        totalVotingPower: state.validators.totalVotingPower,
    };
};

export default connect(stateToProps)(Row);
