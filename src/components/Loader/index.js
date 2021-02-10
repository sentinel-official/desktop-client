import './index.css';
import { Spinner } from 'react-bootstrap';
import React from 'react';

const Loader = () => {
    return (
        <Spinner
            animation="grow"
            className="loader"
        />
    );
};

export default React.memo(Loader);
