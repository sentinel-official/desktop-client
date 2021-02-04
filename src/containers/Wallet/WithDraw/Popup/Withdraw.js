import React from 'react';
import Button from '../../../../components/Button';

const Withdraw = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="WITHDRAW"
            onClick={onClick}
        />
    );
};

export default Withdraw;
