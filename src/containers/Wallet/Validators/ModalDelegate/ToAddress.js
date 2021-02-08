import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../../../components/TextBox';
import { encodeToBech32 } from '../../../../utils/bech32';

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
