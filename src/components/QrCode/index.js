import * as PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import React from 'react';
import './index.css';

const QrCode = (props) => {
    return (
        <div className="qr_code">
            <QRCode size={200} value={props.value}/>
        </div>
    );
};

QrCode.propTypes = {
    value: PropTypes.string.isRequired,
};

export default QrCode;
