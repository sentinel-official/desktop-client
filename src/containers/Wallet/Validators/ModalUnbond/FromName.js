import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../../../components/TextBox';

const FromName = (props) => {
    return (
        <TextBox
            className="account-name"
            value="Forbole"
        />
    );
};

FromName.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.transactions.unbond.from.value,
    };
};

export default connect(stateToProps)(FromName);
