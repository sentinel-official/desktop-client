import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Copy from '../../components/Copy';
import React from 'react';

const PublicKeyCopy = (props) => {
    return (
        <Copy text={props.text}/>
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
