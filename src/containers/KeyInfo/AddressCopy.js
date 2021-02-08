import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Copy from '../../components/Copy';
import { encodeToBech32 } from '../../utils/bech32';

const AddressCopy = (props) => {
    const text = encodeToBech32(props.text, 'sent');

    return (
        <Copy text={text}/>
    );
};

AddressCopy.propTypes = {
    text: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        text: state.keys.post.info.address,
    };
};

export default connect(stateToProps)(AddressCopy);
