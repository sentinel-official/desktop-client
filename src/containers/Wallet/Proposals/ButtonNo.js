import React from 'react';
import Button from '../../../components/Button';

const ButtonNo = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary accordion-button"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="No"
            onClick={onClick}
        />
    );
};

export default ButtonNo;
