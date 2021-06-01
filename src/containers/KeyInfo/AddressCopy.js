import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Copy from '../../components/Copy';
import React from 'react';

const AddressCopy = (props) => {
    return (
        <Copy text={props.text}/>
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
