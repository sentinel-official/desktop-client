import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const Amount = ({
    value,
}) => {
    return (
        <TextBox
            className="address"
            value={value}
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
