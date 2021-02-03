import React from 'react';
import InputField from '../../../components/InputField';

const DepositeAddress = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };

    return (
        <InputField
            className="form-control"
            name="DepositeAddress"
            placeholder="Address"
            required={true}
            type="text"
            value={''}
            onChange={onChange}
        />
    );
};

export default DepositeAddress;
