import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import TextBox from '../../components/TextBox';

const PublicKey = (props) => {
    return (
        <TextBox
            className="value"
            value={props.value}
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
