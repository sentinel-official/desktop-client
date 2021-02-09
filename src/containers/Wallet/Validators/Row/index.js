import Axios from 'axios';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Profile from '../../../../assets/Profile.svg';
import Image from '../../../../components/Image';
import Delegate from './Delegate';
import Redelegate from './Redelegate';
import Unbond from './Unbond';

const Row = ({
    action,
    item,
    status,
    totalVotingPower,
}) => {
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
        const { identity } = item.description;
        if (identity === '') {
            setAvatarURL('');
            return;
        }

        const url = 'https://keybase.io/_/api/1.0/user/lookup.json' +
            `?key_suffix=${identity}&fields=pictures`;

        Axios.get(url)
            .then((res) => {
                const url = res?.data?.them[0]?.pictures?.primary?.url;
                if (url) {
                    setAvatarURL(url);
                }
            })
            .catch(console.error);
    }, [item.description.identity]);

    const active = item.jailed === false && item['bond_status'] === 'Bonded';
    if ((status === 1 && active === false) || (status === 0 && active === true)) {
        return null;
    }

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
                <Image
                    alt="moniker-image"
                    className="moniker-image"
                    src={avatarURL || Profile}
                />
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
                {/* { */}
                {/*    item.delegation */}
                {/*        ? (item.amount.value / parseFloat(item.delegator_shares) * parseFloat(item.delegation.shares) * Math.pow(10, -6)).toFixed(2) */}
                {/*        : parseFloat('0').toFixed(2) */}
                {/* } */}
                {delegation}
            </td>
            <td>
                {status === 1 && action === 0 ? <Delegate to={item.address}/> : null}
                {status === 1 && action === 1 ? <Redelegate from={item.address}/> : null}
                {status === 1 && action === 2 ? <Unbond from={item.address}/> : null}
                {status === 0 && action === 0 ? <Redelegate from={item.address}/> : null}
                {status === 0 && action === 1 ? <Unbond from={item.address}/> : null}
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
    status: PropTypes.number.isRequired,
    totalVotingPower: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        action: state.validators.action,
        status: state.validators.status,
        totalVotingPower: state.validators.totalVotingPower,
    };
};

export default connect(stateToProps)(Row);
