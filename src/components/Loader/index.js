import React from 'react';
import './index.css';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner animation="grow" className="loader"/>
    );
};

export default Loader;
