import React from 'react';
import Button from '../../../../components/Button';

const Submit = () => {
    const onClick = () => {
    };
    return (
        <Button
            className="btn button-primary"
            disabled={false}
            inProgress={false}
            value="Add new key"
            onClick={onClick}
        />
    );
};

export default Submit;
