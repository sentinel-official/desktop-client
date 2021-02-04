import React from 'react';
import Button from '../../../../components/Button';

const ButtonWithVeto = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary accordion-button"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="NoWithVeto"
            onClick={onClick}
        />
    );
};

export default ButtonWithVeto;
