import * as PropTypes from 'prop-types';
import ReactQRCode from 'qrcode.react';
import React from 'react';

const QRCode = ({
    value,
}) => {
    return (
        <ReactQRCode value={value}/>
    );
};

QRCode.propTypes = {
    value: PropTypes.string.isRequired,
};

export default QRCode;
