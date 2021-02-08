import React from 'react';
import Button from '../../../../components/Button';

const Delegate = () => {
    const onClick = () => {
    };
    return (
        <Button
            className="delegate-button"
            disabled={false}
            inProgress={false}
            value="Delegate"
            onClick={onClick}
        />
    );
};

export default Delegate;
