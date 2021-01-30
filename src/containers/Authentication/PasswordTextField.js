import React from 'react';
import InputField from '../../components/InputField';

const PasswordTextField = () => {
    const handleChange = (value) => {
        console.log(value);
    };
    return (
        <InputField
            className="form-control"
            labelText="PASSWORD"
            name="Password"
            placeholder="Enter Password"
            required={true}
            type="password"
            onChange={handleChange}
        />
    );
};

export default PasswordTextField;
