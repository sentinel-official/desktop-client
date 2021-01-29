import React, { useState } from 'react';
import ButtonChip from '../../components/ButtonChip';
import TextBox from '../../components/TextBox';

const BroadCastMode = () => {
    const [broadcastMode, setVariant] = useState(
        {
            Block: 'primary',
            Sync: 'primary',
            Async: 'primary',
        },
    );
    const setVariantType = (type) => {
        setVariant({
            Block: type === 'Block' ? 'selected' : 'primary',
            Sync: type === 'Sync' ? 'selected' : 'primary',
            Async: type === 'Async' ? 'selected' : 'primary',
        });
    };

    const broadcastModeHandler = (type) => {
        console.log(type, 'type');
        if (type === 'Block') {
            const variantType = broadcastMode.Block;
            if (variantType === 'primary') {
                setVariantType('Block');
            } else {
                resetVariant();
            }
        } else if (type === 'Sync') {
            const variantType = broadcastMode.Sync;
            if (variantType === 'primary') {
                setVariantType('Sync');
            } else {
                resetVariant();
            }
        } else if (type === 'Async') {
            const variantType = broadcastMode.Async;
            if (variantType === 'primary') {
                setVariantType('Async');
            } else {
                resetVariant();
            }
        }
    };
    const resetVariant = () => {
        setVariant({
            Block: 'primary',
            Sync: 'primary',
            Async: 'primary',
        });
    };
    return (
        <div className="form-group">
            <TextBox className="label" value="BROADCAST MODE" />
            <div className="button-group">
                <ButtonChip className={broadcastMode.Block} type="button" value="Block" onClick={broadcastModeHandler}/>
                <ButtonChip className={broadcastMode.Sync} type="button" value="Sync" onClick={broadcastModeHandler}/>
                <ButtonChip className={broadcastMode.Async} type="button" value="Async" onClick={broadcastModeHandler}/>
            </div>
        </div>
    );
};

export default BroadCastMode;
