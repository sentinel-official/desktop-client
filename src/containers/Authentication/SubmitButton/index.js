import React from 'react';
import * as PropTypes from 'prop-types';
import './index.css';
import Button from '../../../components/Button';

const SubmitButton = (props) => {
    return (
        <div className="SubmitButton-floating">
            <Button
                name="LOGIN"
                onClick={props.onClick}/>
        </div>
    );
};

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
