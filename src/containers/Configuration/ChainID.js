import React from 'react';
import InputField from '../../components/InputField';

const ChainID = () => {
    const onChange = (event) => {
    };

    return (
        <InputField
            className="form-control"
            name="ChainID"
            placeholder="Enter Chain ID"
            required={true}
            type="text"
            value={''}
            onChange={onChange}
        />
    );
};

export default ChainID;
