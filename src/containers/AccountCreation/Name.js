import React from 'react';
import InputField from '../../components/InputField';

const Name = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };
    return (
        <InputField
            className="form-control"
            name="AccountName"
            placeholder="Account Username"
            required={true}
            type="text"
            value={''}
            onChange={onChange}
        />
    );
};

export default Name;
