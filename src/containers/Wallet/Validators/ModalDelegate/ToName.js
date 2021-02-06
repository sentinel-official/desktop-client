import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../../../components/TextBox';

const ToName = (props) => {
    return (
        <TextBox
            className="account-name"
            value="Forbole"
        />
    );
};

ToName.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.transactions.delegate.to.value,
    };
};

export default connect(stateToProps)(ToName);
