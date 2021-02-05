import React from 'react';
import Button from '../../../../components/Button';

const ButtonAbstain = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary accordion-button"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="Abstain"
            onClick={onClick}
        />
    );
};

export default ButtonAbstain;
