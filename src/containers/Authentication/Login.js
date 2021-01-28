import React from 'react';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import TextBox from '../../components/TextBox';
import SocialIcons from '../../components/SocialIcons';

const Login = () => {
    const handleChange = (value) => {
        console.log(value);
    };
    return (
        <form>
            <div className="login-body">
                <TextBox className="login-title" value="Authenticate Sentinel Client"/>
                <InputField
                    className="form-control"
                    labelText="PASSWORD"
                    name="Password"
                    placeholder="Enter Password"
                    required={true}
                    type="password"
                    onChange={handleChange}
                />
            </div>
            <div className="login-footer">
                <SocialIcons/>
                <div className="login-button">
                    <Button className="btn button-primary" value="LOGIN"/>
                </div>
            </div>
        </form>
    );
};

export default Login;
