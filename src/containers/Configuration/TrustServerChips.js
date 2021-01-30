import React from 'react';
import ButtonChip from '../../components/ButtonChip';

const TrustServerChips = () => {
    const trustServer = true;
    const rpcServerHandler = (value) => {
        console.log(value, 'broadcast mode');
    };
    return (
        <div className="button-group">
            <ButtonChip
                className={trustServer === true ? 'selected' : 'primary'}
                type="button" value="Yes"
                onClick={rpcServerHandler}
            />
            <ButtonChip
                className={trustServer === false ? 'selected' : 'primary'}
                type="button"
                value="No"
                onClick={rpcServerHandler}
            />
        </div>
    );
};

export default TrustServerChips;
