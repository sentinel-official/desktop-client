import React from 'react';
import Button from '../../../../components/Button';

const ButtonYes = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary accordion-button"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="Yes"
            onClick={onClick}
        />
    );
};

export default ButtonYes;
