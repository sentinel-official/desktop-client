import React from 'react';
import { Spinner } from 'react-bootstrap';
import './index.css';

const Loader = () => {
    return (
        <Spinner
            animation="grow"
            className="loader"
        />
    );
};

export default React.memo(Loader);
