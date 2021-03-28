import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { encodeToBech32 } from '../../utils/bech32';
import React from 'react';
import TextBox from '../../components/TextBox';

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
