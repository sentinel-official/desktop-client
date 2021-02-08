import Axios from 'axios';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Logo from '../../../../assets/Logo.svg';
import Image from '../../../../components/Image';
import Delegate from './Delegate';
import Redelegate from './Redelegate';
import Unbond from './Unbond';

const Row = (props) => {
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
        const { identity } = props.description;
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
    }, [props.description.identity]);

    const active = props.jailed === false && props['bond_status'] === 'Bonded';
    if ((active && props.status === 0) || (!active && props.status === 1)) {
        return null;
    }

    return (
        <tr key={props.index}>
            <td className="flex-center">
                <div className="serial">
                    {props.index}
                </div>
                <Image
                    alt="moniker-image"
                    className="moniker-image"
                    src={avatarURL || Logo}
                />
            </td>
            <td>
                {props.description.moniker}
            </td>
            <td>
                {(props.amount.value / Math.pow(10, 6)).toFixed(2)}
            </td>
            <td>
                {(props.commission.rate * 100).toFixed(2)}%
            </td>
            <td>
                {
                    props.action === 0 && props.status === 1 ? <Delegate to={props.address}/> : null
                }
                {
                    props.action === 1 ? <Redelegate from={props.address}/> : null
                }
                {
                    props.action === 2 ? <Unbond from={props.address}/> : null
                }
            </td>
        </tr>
    );
};

Row.propTypes = {
    action: PropTypes.number.isRequired,
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
    status: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        action: state.validators.action,
        status: state.validators.status,
    };
};

export default connect(stateToProps)(Row);
