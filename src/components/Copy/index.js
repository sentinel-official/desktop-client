import * as PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './index.css';
import Icon from '../Icon';

const Copy = ({ text }) => {
    return (
        <div className="copy-section">
            <CopyToClipboard text={text}>
                <div className="flex-center">
                    <Icon
                        className="icon"
                        icon="copy"
                    />
                </div>
            </CopyToClipboard>
        </div>
    );
};

Copy.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Copy;
