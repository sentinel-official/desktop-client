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

    const handleBroadCastMode = (type) => {
        console.log(type, 'broadcast mode');
        if (type === 'Block') {
            setVariant({
                Block: 'selected',
                Sync: 'primary',
                Async: 'primary',
            });
        } else if (type === 'Sync') {
            setVariant({
                Sync: 'selected',
                Block: 'primary',
                Async: 'primary',
            });
        } else if (type === 'Async') {
            setVariant({
                Async: 'selected',
                Block: 'primary',
                Sync: 'primary',
            });
        }
    };
    const ChipConfig = [{
        className: broadcastMode.Block,
        value: 'Block',
    }, {
        className: broadcastMode.Sync,
        value: 'Sync',
    }, {
        className: broadcastMode.Async,
        value: 'Async',
    }];
    return (
        <div className="button-group">
            {
                ChipConfig.map((item) =>
                    <ButtonChip
                        key={item.value}
                        className={item.className}
                        type="button"
                        value={item.value}
                        onClick={handleBroadCastMode}
                    />,
                )
            }
        </div>
    );
};

export default BroadCastChips;
