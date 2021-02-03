import React from 'react';
import ReactQRCode from 'qrcode.react';
const QRCode = () => {
    return (
        <>
            <ReactQRCode value="http://facebook.github.io/react/" />
        </>
    );
};

export default QRCode;
