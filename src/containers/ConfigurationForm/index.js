import React from 'react';
import AddressTextField from './AddressTextField';
import BroadCastMode from './BroadCastMode';
import FeeTextField from './FeeTextField';
import GasTextField from './GasTextField';
import ChainIDTextField from './ChainIDTextField';
import RpcServer from './RpcServer';
import SocialIcons from '../../components/SocialIcons';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';

const ConfigurationForm = () => {
    return (
        <form>
            <TextBox className="login-title" value="Configure Settings"/>
            <div className="config-row">
                <div className="col-md-6">
                    <BroadCastMode/>
                    <FeeTextField/>
                    <GasTextField/>
                </div>
                <div className="col-md-6">
                    <ChainIDTextField/>
                    <RpcServer/>
                    <AddressTextField/>
                </div>
                <div className="login-footer">
                    <SocialIcons/>
                    <div className="login-button">
                        <Button className="btn button-primary" loading={false} type="button" value="SAVE" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ConfigurationForm;
