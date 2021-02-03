import React from 'react';
import Button from '../../../components/Button';

const WithDraw = () => {
    const onClick = () => {

    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            loading={false}
            type="button"
            value="WithDraw"
            onClick={onClick}
        />
    );
};

export default WithDraw;
