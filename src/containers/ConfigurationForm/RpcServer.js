import React, { useState } from 'react';
import ButtonChip from '../../components/ButtonChip';
import TextBox from '../../components/TextBox';

const RpcServer = () => {
    const [rpcServer, setRpcServer] = useState(true);

    const rpcServerHandler = () => {
        setRpcServer(!rpcServer);
    };
    return (
        <>
            <TextBox className="label" value="Trust RPC Server" />
            <div className="button-group">
                <ButtonChip className={rpcServer === true ? 'selected' : 'primary'} type="button" value="Yes" onClick={rpcServerHandler}/>
                <ButtonChip className={rpcServer === false ? 'selected' : 'primary'} type="button" value="No" onClick={rpcServerHandler}/>
            </div>
        </>
    );
};

export default RpcServer;
