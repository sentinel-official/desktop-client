import React from 'react';
import Button from '../../components/Button';

const SubmitButton = () => {
    return (
        <Button
            className="btn button-primary"
            disabled={false}
            loading={false}
            type="button"
            value="SAVE"
        />
    );
};

export default SubmitButton;
