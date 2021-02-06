import React from 'react';
import Button from '../../../../components/Button';

const Withdraw = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary button-large"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="Withdraw"
            onClick={onClick}
        />
    );
};

export default Withdraw;
