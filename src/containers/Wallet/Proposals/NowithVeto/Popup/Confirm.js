import React from 'react';
import Button from '../../../../../components/Button';

const Confirm = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="Confirm Vote"
            onClick={onClick}
        />
    );
};

export default Confirm;
