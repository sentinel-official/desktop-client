import * as PropTypes from 'prop-types';
import React from 'react';
import TextBox from '../../../components/TextBox';

const Address = ({
    value,
}) => {
    return (
        <div className="receive-address">
            <TextBox
                className=""
                value={value}
            />
        </div>
    );
};

Address.propTypes = {
    value: PropTypes.string.isRequired,
};

export default Address;
