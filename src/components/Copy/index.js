import { CopyToClipboard } from 'react-copy-to-clipboard';
import React from 'react';
import Icon from '../Icon';
import './index.css';
import * as PropTypes from 'prop-types';
const Copy = (props) => {
    return (
        <div className="copy-section">
            <CopyToClipboard text={props.text}>
                <Icon
                    className="icon"
                    icon="copy"
                />
            </CopyToClipboard>
        </div>
    );
};

Copy.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Copy;
