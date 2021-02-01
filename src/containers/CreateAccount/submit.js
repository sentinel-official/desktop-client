import React from 'react';
import Button from '../../components/Button';

const Submit = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            loading={false}
            type="button"
            value="Create"
            onClick={onClick}
        />
    );
};

export default Submit;
