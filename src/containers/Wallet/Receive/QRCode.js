import * as PropTypes from 'prop-types';
import ReactQRCode from 'qrcode.react';
import React from 'react';
import { connect } from 'react-redux';
import { encodeToBech32 } from '../../../utils/bech32';

const QRCode = ({
    items,
    index,
}) => {
    const value = encodeToBech32(items[index]?.address, 'sent');

    return (
        <ReactQRCode value={value}/>
    );
};

QRCode.propTypes = {
    index: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        index: state.keys.index,
        items: state.keys.items,
    };
};

const actionsToProps = {};

export default connect(stateToProps, actionsToProps)(QRCode);
