import Button from '../../../../components/Button';
import React from 'react';

const ButtonYes = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary accordion-button"
            disabled={false}
            inProgress={false}
            type="button"
            value="Yes"
            onClick={onClick}
        />
    );
};

export default ButtonYes;
