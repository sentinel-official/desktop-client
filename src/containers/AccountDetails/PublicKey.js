import React from 'react';
import TextBox from '../../components/TextBox';

const PublicKey = () => {
    const publicKey = 'cosmosaccpub1addwnpepqvw3ea6crfamul8a9v3vlle6p2c99cx02ykex9u09r3p72g83w7vxu09k6z';
    return (
        <TextBox
            className="value"
            value={publicKey}
        />
    );
};

export default PublicKey;
