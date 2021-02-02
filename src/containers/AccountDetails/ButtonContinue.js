import React from 'react';
import Button from '../../components/Button';

const ButtonContinue = () => {
    const onClick = () => {

    };
    return (
        <Button
            className="btn button-primary"
            disabled={false}
            loading={false}
            type="button"
            value="Continue"
            onClick={onClick}
        />
    );
};

export default ButtonContinue;
