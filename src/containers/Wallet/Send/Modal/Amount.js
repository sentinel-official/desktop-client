import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../../../components/TextBox';

const Amount = (props) => {
    return (
        <TextBox
            className="address"
            value={props.value}
        />
    );
};

Amount.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.transactions.send.amount.value,
    };
};

export default connect(stateToProps)(Amount);
