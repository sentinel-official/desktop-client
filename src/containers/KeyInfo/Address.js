import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../components/TextBox';
import { encodeToBech32 } from '../../utils/bech32';

const Address = (props) => {
    const value = encodeToBech32(props.value, 'sent');

    return (
        <TextBox
            className="value"
            value={value}
        />
    );
};

Address.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.keys.post.info.address,
    };
};

export default connect(stateToProps)(Address);
