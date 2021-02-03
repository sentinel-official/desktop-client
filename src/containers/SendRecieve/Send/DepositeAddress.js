import React from 'react';
import TextInputField from '../../../components/TextInputField';

const DepositeAddress = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };

    return (
        <TextInputField
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
