import React from 'react';
import TextBox from '../../components/TextBox';

const Seed = () => {
    const seed = 'awkward lonely swear car strategy bacon theory grab lottery wear hope tiger resource future nact best ' +
        'commo ornado beach always  pause bonus urban';
    return (
        <TextBox
            className="value seed"
            value={seed}
        />
    );
};

export default Seed;
