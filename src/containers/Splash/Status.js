import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import TextBox from '../../components/TextBox';

export const Status = ({
    message,
}) => {
    return (
        <TextBox
            className="splash-text f-14 fw-600"
            value={message}
        />
    );
};

Status.propTypes = {
    message: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        message: state.splash.message,
    };
};

export default connect(stateToProps)(Status);
