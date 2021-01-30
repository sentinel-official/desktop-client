import React from 'react';
import InputField from '../../components/InputField';

const FeeTextField = () => {
    const handleChange = (value) => {
        console.log(value);
    };
    return (
        <InputField
            className="form-control"
            name="Fee"
            placeholder="Enter Fee"
            required={true}
            type="text"
            onChange={handleChange}
        />
    );
};

export default FeeTextField;
