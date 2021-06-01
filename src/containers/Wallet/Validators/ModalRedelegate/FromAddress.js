import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const FromAddress = (props) => {
    return (
        <TextBox
            className="address"
            value={props.value}
        />
    );
};

FromAddress.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.transactions.redelegate.from.value,
    };
};

export default connect(stateToProps)(FromAddress);
