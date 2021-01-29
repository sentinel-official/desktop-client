import React from 'react';
import InputField from '../../components/InputField';

const ChainIDTextField = () => {
    const handleChange = (value) => {
        console.log(value);
    };
    return (
        <InputField
            className="form-control"
            labelText="Chain ID"
            name="ChainID"
            placeholder="ChainID"
            required={true}
            type="text"
            onChange={handleChange}
        />
    );
};

export default ChainIDTextField;
