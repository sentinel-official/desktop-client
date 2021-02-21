import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { encodeToBech32 } from '../../../../utils/bech32';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const ToAddress = (props) => {
    const value = encodeToBech32(props.value, 'sentvaloper');

    return (
        <TextBox
            className="address"
            value={value}
        />
    );
};

ToAddress.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.transactions.delegate.to.value,
    };
};

export default connect(stateToProps)(ToAddress);
