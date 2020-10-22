import React from 'react';
import * as PropTypes from 'prop-types';
import './index.css';
import FormSubmitButton from '../../components/FormSubmitButton';

const SubmitButton = (props) => {
    return (
        <div className="floating_button">
            <FormSubmitButton
                button_name="LOGIN"
                onClick={props.onClick}/>
        </div>
    );
};

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
