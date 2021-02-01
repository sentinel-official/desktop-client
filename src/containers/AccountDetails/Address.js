import React from 'react';
import TextBox from '../../components/TextBox';

const Address = () => {
    const address = 'cosmosaccaddr1q0sxllakn9eh75nl2cntvfwnegxqfljjmeggj7';
    return (
        <TextBox
            className="value"
            value={address}
        />
    );
};

export default Address;
