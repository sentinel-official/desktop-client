import Button from '../../../../components/Button';
import React from 'react';

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
