import React from 'react';
import Button from '../../../../components/Button';

const Delegate = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary button-large"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="Delegate"
            onClick={onClick}
        />
    );
};

export default Delegate;
