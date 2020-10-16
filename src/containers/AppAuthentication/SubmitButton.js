import React from 'react';
import * as PropTypes from 'prop-types';
import './index.css';
import FormSubmitButton from '../../components/FormSubmitButton';

const SubmitButton = (props) => {
    return (
        <div className="floatingButton">
            <FormSubmitButton
                button_name="LOGIN"
                form_name={props.form_name}/>
        </div>
    );
};

SubmitButton.propTypes = {
    form_name: PropTypes.string.isRequired,
};

export default SubmitButton;
