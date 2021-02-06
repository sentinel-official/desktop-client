import React from 'react';
import Button from '../../../../components/Button';

const Unbond = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="Unbond"
            onClick={onClick}
        />
    );
};

export default Unbond;
