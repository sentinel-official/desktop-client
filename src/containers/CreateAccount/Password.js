import React from 'react';
import InputField from '../../components/InputField';

const Password = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };
    return (
        <InputField
            className="form-control"
            name="password"
            placeholder="Password"
            required={true}
            type="password"
            onChange={onChange}
        />
    );
};

export default Password;
