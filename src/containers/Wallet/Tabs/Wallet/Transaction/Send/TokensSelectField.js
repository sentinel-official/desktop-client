import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTokenType } from '../../../../../../actions/wallet';
import SelectField from '../../../../../../components/SelectField';

const TokensSelectField = (props) => {
    return (
        <SelectField
            id="tokens_select_field"
            items={props.items}
            name="tokens"
            value={props.value}
            onChange={props.onChange}/>
    );
};

TokensSelectField.propTypes = {
    items: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.wallet.transactions.send.sentToken,
        items: state.wallet.transactions.send.tokenType,
    };
};

const actionsToProps = {
    onChange: setTokenType,
};

export default connect(stateToProps, actionsToProps)(TokensSelectField);
