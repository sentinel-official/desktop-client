import React from 'react';
import Button from '../../../../components/Button';

const Delete = () => {
    const onClick = () => {
    };
    return (
        <Button
            className="btn button-primary button-large"
            disabled={false}
            inProgress={false}
            type="button"
            value="Delete"
            onClick={onClick}
        />
    );
};

export default Delete;
