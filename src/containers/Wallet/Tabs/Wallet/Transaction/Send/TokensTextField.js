import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTokensToSend } from '../../../../../../actions/wallet';
import TextField from '../../../../../../components/TextField';
import variables from '../../../../../../dummy/variables';

const TokensTextField = (props) => {
    return (
        <TextField
            className="tokens_text_field"
            id="tokens_to_send_text_field"
            name="tokensToSend"
            placeholder={variables[props.lang].tokens}
            type="number"
            value={props.value}
            onChange={props.onChange}/>
    );
};

TokensTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.wallet.transactions.send.tokensToSend,
    };
};

const actionsToProps = {
    onChange: setTokensToSend,
};

export default connect(stateToProps, actionsToProps)(TokensTextField);
