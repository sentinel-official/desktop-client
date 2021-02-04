import React from 'react';
import TextInputField from '../../../components/TextInputField';

const To = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };

    return (
        <TextInputField
            className="form-control"
            name="DepositAddress"
            placeholder="Address"
            required={true}
            type="text"
            value={''}
            onChange={onChange}
        />
    );
};

export default To;
