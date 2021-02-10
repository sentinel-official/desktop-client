import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAccount } from '../../actions/account';
import { getCoingecko } from '../../actions/coingecko';
import React, { useEffect } from 'react';
import TextBox from '../../components/TextBox';

const Balance = (props) => {
    useEffect(() => {
        props.getCoingecko();
    }, []);

    useEffect(() => {
        props.getAccount();
    }, [props.items, props.index]);

    let tokens = (props.coins[0]?.value * Math.pow(10, -6)) || 0;
    let USD = tokens * props.rate;

    tokens = parseFloat(tokens.toFixed(2)).toLocaleString();
    USD = parseFloat(USD.toFixed(2)).toLocaleString();

    return (
        <div className="token-info">
            <TextBox
                className="sent-title"
                value="Balance"
            />
            <div className="sent-list">
                <TextBox
                    className="heading"
                    value={tokens}
                />
                <TextBox
                    className="value"
                    value={`(= $${USD} USD)`}
                />
            </div>
        </div>
    );
};

Balance.propTypes = {
    coins: PropTypes.arrayOf(
        PropTypes.shape({
            denom: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
    getAccount: PropTypes.func.isRequired,
    getCoingecko: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
        }),
    ).isRequired,
    rate: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        coins: state.account.info.coins,
        index: state.keys.index,
        items: state.keys.items,
        rate: state.coingecko.rate,
    };
};

const actionsToProps = {
    getAccount: getAccount,
    getCoingecko: getCoingecko,
};

export default connect(stateToProps, actionsToProps)(Balance);
