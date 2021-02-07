import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../../../components/TextBox';

const Amount = (props) => {
    const value = props.value.toString();

    return (
        <TextBox
            className="address"
            value={value}
        />
    );
};

Amount.propTypes = {
    value: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.transactions.send.amount.value,
    };
};

export default connect(stateToProps)(Amount);
