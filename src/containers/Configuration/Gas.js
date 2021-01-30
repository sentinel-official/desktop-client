import React from 'react';
import InputField from '../../components/InputField';

const Gas = () => {
    const onChange = (event) => {
    };

    return (
        <InputField
            className="form-control"
            name="gas"
            placeholder="Enter Gas"
            required={true}
            type="text"
            value={''}
            onChange={onChange}
        />
    );
};

export default Gas;
