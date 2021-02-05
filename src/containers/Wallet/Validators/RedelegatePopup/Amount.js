import React from 'react';
import TextInputField from '../../../../components/TextInputField';
const Amount = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };
    return (
        <TextInputField
            className="form-control"
            name="TokenAmount"
            placeholder="Token Amount"
            required={true}
            type="text"
            value=""
            onChange={onChange}
        />
    );
};

export default Amount;