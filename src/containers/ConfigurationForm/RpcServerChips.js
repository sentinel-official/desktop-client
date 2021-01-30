import React, { useState } from 'react';
import ButtonChip from '../../components/ButtonChip';

const RpcServerChips = () => {
    const [rpcServer, setRpcServer] = useState(true);

    const rpcServerHandler = () => {
        setRpcServer(!rpcServer);
    };
    return (
        <div className="button-group">
            <ButtonChip className={rpcServer === true ? 'selected' : 'primary'} type="button" value="Yes" onClick={rpcServerHandler}/>
            <ButtonChip className={rpcServer === false ? 'selected' : 'primary'} type="button" value="No" onClick={rpcServerHandler}/>
        </div>
    );
};

export default RpcServerChips;
