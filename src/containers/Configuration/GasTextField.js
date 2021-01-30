import React from 'react';
import NumberInputField from '../../components/NumberInputField';

const GasTextField = () => {
    const handleChange = (value) => {
        console.log(value);
    };
    return (
        <NumberInputField
            className="form-control"
            minimum={1}
            name="gas"
            placeholder="Enter Gas Amount"
            required={true}
            type="number"
            onChange={handleChange}
        />
    );
};

export default GasTextField;
