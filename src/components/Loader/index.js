import './index.css';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import React from 'react';

const Spinner = () => {
    return (
        <BootstrapSpinner
            animation="grow"
            className="loader"
        />
    );
};

export default React.memo(Spinner);
