import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../components/TextBox';
import { encodeToBech32 } from '../../utils/bech32';

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
        value: state.keys.post.info['pub_key'],
    };
};

export default connect(stateToProps)(PublicKey);
