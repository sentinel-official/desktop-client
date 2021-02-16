import Button from '../../../../../components/Button';
import React from 'react';

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
