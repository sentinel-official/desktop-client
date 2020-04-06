import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setGasPrice } from '../../../../../../../actions/wallet';
import TextField from '../../../../../../../components/TextField';
import variables from '../../../../../../../dummy/variables';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import './index.css';

const GasPriceTextField = (props) => {
    return (
        <div className="number_text_field">
            <TextField
                className="gas_price"
                id="gas_price_text_field"
                name="gasPrice"
                placeholder={variables[props.lang].enter_gas_price}
                type="number"
                value={props.value}
                onChange={props.onChange}/>
            <div className="buttons_div">
                <IncrementButton/>
                <DecrementButton/>
            </div>
        </div>
    );
};

GasPriceTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.wallet.transactions.send.gasPrice,
    };
};

const actionsToProps = {
    onChange: setGasPrice,
};

export default connect(stateToProps, actionsToProps)(GasPriceTextField);
