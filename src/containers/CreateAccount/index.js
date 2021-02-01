import React from 'react';
import SocialIcons from '../../components/SocialIcons';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';
import Name from './Name';
import Password from './Password';
import Seed from './Seed';

const CreatAccount = () => {
    return (
        <form>
            <TextBox className="login-title" value="Create Account"/>
            <div className="account-create-row">
                <div className="">
                    <Name/>
                    <Password/>
                    <Seed/>
                </div>
                <div className="login-footer">
                    <SocialIcons/>
                    <div className="login-button">
                        <Button className="btn button-primary" loading={false} type="button" value="Create" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CreatAccount;
