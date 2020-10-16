import React from 'react';
import * as PropTypes from 'prop-types';
import './index.css';

const FormSubmitButton = (props) => {
    return (
        <div className="submitBtn">
            <input
                className={'footer_button'}
                form={props.form_name} type="submit"
                value={props.button_name}/>
        </div>
    );
};

FormSubmitButton.propTypes = {
    button_name: PropTypes.string.isRequired,
    form_name: PropTypes.string,
};

export default FormSubmitButton;
