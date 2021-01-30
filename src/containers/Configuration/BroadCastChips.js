import React, { useState } from 'react';
import ButtonChip from '../../components/ButtonChip';

const BroadCastChips = () => {
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

    const handleBroadCastMode = (type) => {
        console.log(type, 'broadcast mode');
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
        <div className="button-group">
            <ButtonChip
                className={broadcastMode.Block}
                type="button"
                value="Block"
                onClick={handleBroadCastMode}
            />
            <ButtonChip
                className={broadcastMode.Sync}
                type="button"
                value="Sync"
                onClick={handleBroadCastMode}
            />
            <ButtonChip
                className={broadcastMode.Async}
                type="button"
                value="Async"
                onClick={handleBroadCastMode}
            />
        </div>
    );
};

export default BroadCastChips;
