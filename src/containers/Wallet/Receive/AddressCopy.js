import * as PropTypes from 'prop-types';
import React from 'react';
import Copy from '../../../components/Copy';

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
