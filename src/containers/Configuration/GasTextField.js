import React from 'react';
import InputField from '../../components/InputField';

const GasTextField = () => {
    const handleChange = (value) => {
        console.log(value);
    };
    return (
        <InputField
            className="form-control"
            name="gas"
            placeholder="Enter Gas Amount"
            required={true}
            type="text"
            onChange={handleChange}
        />
    );
};

export default GasTextField;
