import React from 'react';
import * as PropTypes from 'prop-types';
import Socials from './Socials';
import './index.css';

const Footer = (props) => {
    return (
        <div className={'footer'}>
            <div className="footer_content">
                <Socials/>
                <input className={'footer_button'} form={props.form_name} type="submit" value={props.button_name}/>
            </div>
        </div>
    );
};

Footer.propTypes = {
    button_name: PropTypes.string.isRequired,
    form_name: PropTypes.string,
};

export default Footer;
