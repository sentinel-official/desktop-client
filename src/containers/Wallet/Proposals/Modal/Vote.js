import React from 'react';
import Button from '../../../../components/Button';

const Vote = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="Vote"
            onClick={onClick}
        />
    );
};

export default Vote;
