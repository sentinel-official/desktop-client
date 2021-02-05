import React from 'react';
import TextInputField from '../../../../components/TextInputField';

const ToAddress = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };
    return (
        <TextInputField
            className="form-control"
            name="To"
            placeholder="Enter To Address"
            required={true}
            type="text"
            value=""
            onChange={onChange}
        />
    );
};

export default ToAddress;
