import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setAmount } from '../../../../../../../actions/unBond';
import TextField from '../../../../../../../components/TextField';
import variables from '../../../../../../../dummy/variables';

const AmountTextField = (props) => {
    return (
        <TextField
            id="un_bond_amount_text_field"
            name="amount"
            placeholder={variables[props.lang].enter_amount}
            type="text"
            value={props.value}
            onChange={props.onChange}/>
    );
};

AmountTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.staking.unBond.unBondDialog.amount,
    };
};

const actionsToProps = {
    onChange: setAmount,
};

export default connect(stateToProps, actionsToProps)(AmountTextField);
