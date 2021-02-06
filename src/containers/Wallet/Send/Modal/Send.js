import React from 'react';
import Button from '../../../../components/Button';

const Send = () => {
    const onClick = () => {
    };

    return (
        <Button
            className="btn button-primary button-large"
            disabled={false}
            inProgress={false}
            loading={false}
            type="button"
            value="Send"
            onClick={onClick}
        />
    );
};

export default Send;
