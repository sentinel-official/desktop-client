import React from 'react';
import InputField from '../../components/InputField';

const RPCAddress = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };

    return (
        <InputField
            className="form-control"
            name="RPCAddress"
            placeholder="Enter RPC Address"
            required={true}
            type="text"
            value={''}
            onChange={onChange}
        />
    );
};

export default RPCAddress;
