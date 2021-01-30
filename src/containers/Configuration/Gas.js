import React from 'react';
import NumberInputField from '../../components/NumberInputField';

const Gas = () => {
    const onChange = (event) => {
    };

    return (
        <NumberInputField
            className="form-control"
            min={1}
            name="gas"
            placeholder="Enter Gas"
            required={true}
            type="number"
            value={''}
            onChange={onChange}
        />
    );
};

export default Gas;
