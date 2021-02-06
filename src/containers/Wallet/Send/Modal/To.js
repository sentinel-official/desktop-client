import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../../../components/TextBox';
import { encodeToBech32 } from '../../../../utils/bech32';

const To = (props) => {
    const value = encodeToBech32(props.value, 'sent');

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
