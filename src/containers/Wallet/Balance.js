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
    }, [props.name]);

    let tokens = (props.balance.value * Math.pow(10, -6)) || 0;
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
    balance: PropTypes.shape({
        denom: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,
    getAccount: PropTypes.func.isRequired,
    getCoingecko: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        balance: state.account.info.balance,
        name: state.keys.name,
        rate: state.coingecko.rate,
    };
};

const actionsToProps = {
    getAccount: getAccount,
    getCoingecko: getCoingecko,
};

export default connect(stateToProps, actionsToProps)(Balance);
