import * as PropTypes from 'prop-types';
import Copy from '../../../components/Copy';
import React from 'react';

const AddressCopy = ({
    text,
}) => {
    return (
        <Copy text={text}/>
    );
};

AddressCopy.propTypes = {
    text: PropTypes.string.isRequired,
};

export default AddressCopy;
