import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const ToAddress = (props) => {
    return (
        <TextBox
            className="address"
            value={props.value}
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
