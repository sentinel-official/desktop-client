import React from 'react';
import InputField from '../../components/InputField';

const Fee = () => {
    const onChange = (event) => {
    };

    return (
        <InputField
            className="form-control"
            name="Fee"
            placeholder="Enter Fee"
            required={true}
            type="text"
            value={''}
            onChange={onChange}
        />
    );
};

export default Fee;
