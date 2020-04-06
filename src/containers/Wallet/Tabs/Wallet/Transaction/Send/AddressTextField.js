import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setAddressToSend } from '../../../../../../actions/wallet';
import TextField from '../../../../../../components/TextField';
import variables from '../../../../../../dummy/variables';

const AddressTextField = (props) => {
    return (
        <TextField
            className="text_field2"
            id="address_to_send_text_field"
            name="addressToSend"
            placeholder={variables[props.lang].enter_address}
            type="text"
            value={props.value}
            onChange={props.onChange}/>
    );
};

AddressTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.wallet.transactions.send.addressToSend,
    };
};

const actionsToProps = {
    onChange: setAddressToSend,
};

export default connect(stateToProps, actionsToProps)(AddressTextField);
