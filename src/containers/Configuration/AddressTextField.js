import React from 'react';
import InputField from '../../components/InputField';

const AddressTextField = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };
    return (
        <InputField
            className="form-control"
            labelText="RPC Server Address"
            name="Address"
            placeholder="RPC Address"
            required={true}
            type="text"
            onChange={onChange}
        />
    );
};

export default AddressTextField;
