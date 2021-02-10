import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const To = ({
    value,
}) => {
    return (
        <TextBox
            className="address"
            value={value}
        />
    );
};

To.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.transactions.send.to.value,
    };
};

export default connect(stateToProps)(To);
