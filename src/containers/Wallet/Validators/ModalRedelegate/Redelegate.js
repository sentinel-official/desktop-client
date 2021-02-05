import React from 'react';
import Button from '../../../../components/Button';

const Delegate = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="Redelegate"
            onClick={onClick}
        />
    );
};

export default Delegate;
