import React from 'react';
import TextInputField from '../../../../components/TextInputField';

const Fee = (props) => {
    const onChange = (event) => {
    };

    return (
        <TextInputField
            className="form-control"
            name="Fee"
            placeholder="Enter Fee"
            required={true}
            type="text"
            value=""
            onChange={onChange}
        />
    );
};

export default Fee;
