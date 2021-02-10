import * as PropTypes from 'prop-types';
import React from 'react';
import ReactQRCode from 'qrcode.react';

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
