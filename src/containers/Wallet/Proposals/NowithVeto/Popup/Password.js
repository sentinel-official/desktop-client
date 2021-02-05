import React from 'react';
import TextInputField from '../../../../../components/TextInputField';

const Password = (props) => {
    const onChange = (event) => {
    };

    return (
        <TextInputField
            className="form-control"
            name="password"
            placeholder="Enter Password"
            required={true}
            type="password"
            value=""
            onChange={onChange}
        />
    );
};

export default Password;
