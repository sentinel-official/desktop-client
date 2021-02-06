import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Copy from '../../../components/Copy';
import { encodeToBech32 } from '../../../utils/bech32';

const AddressCopy = (props) => {
    const text = encodeToBech32(props.items[props.index]?.address, 'sent');

    return (
        <Copy text={text}/>
    );
};

AddressCopy.propTypes = {
    index: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        index: state.keys.index,
        items: state.keys.items,
    };
};

const actionsToProps = {};

export default connect(stateToProps, actionsToProps)(AddressCopy);
