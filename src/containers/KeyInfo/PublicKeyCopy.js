import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Copy from '../../components/Copy';
import { encodeToBech32 } from '../../utils/bech32';

const PublicKeyCopy = (props) => {
    const text = encodeToBech32(props.text, 'sentpub');

    return (
        <Copy text={text}/>
    );
};

PublicKeyCopy.propTypes = {
    text: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        text: state.keys.post.info.publicKey,
    };
};

export default connect(stateToProps)(PublicKeyCopy);
