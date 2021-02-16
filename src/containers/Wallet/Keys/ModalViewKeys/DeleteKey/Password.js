import React from 'react';
import TextInputField from '../../../../../components/TextInputField';

const Password = () => {
    const onChange = (event) => {
    };

    return (
        <TextInputField
            autofocus={false}
            className="form-control"
            error={new Error('')}
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
