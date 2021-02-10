import React from 'react';
import TextInputField from '../../../../components/TextInputField';

const Password = () => {
    const onChange = (event) => {
    };

    return (
        <TextInputField
            className="form-control"
            error={0}
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
