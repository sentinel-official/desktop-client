import React from 'react';
import InputField from '../../../components/InputField';

const Amount = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };

    return (
        <InputField
            className="form-control"
            name="Amount"
            placeholder="Total Amount"
            required={true}
            type="text"
            value={''}
            onChange={onChange}
        />
    );
};

export default Amount;
