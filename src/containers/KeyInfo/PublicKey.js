import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { encodeToBech32 } from '../../utils/bech32';
import React from 'react';
import TextBox from '../../components/TextBox';

const PublicKey = (props) => {
    const value = encodeToBech32(props.value, 'sentpub');

    return (
        <TextBox
            className="value"
            value={value}
        />
    );
};

PublicKey.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.keys.post.info.publicKey,
    };
};

export default connect(stateToProps)(PublicKey);
