import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../../components/TextBox';
import { encodeToBech32 } from '../../../utils/bech32';
import Address from './Address';
import AddressCopy from './AddressCopy';
import QRCode from './QRCode';

const Receive = ({
    index,
    items,
}) => {
    const address = encodeToBech32(items[index]?.address, 'sent');

    return (
        <>
            <TextBox
                className="qr-title"
                value="Show QR code to Receive Amount"/>
            <div className="qr-box">
                <QRCode value={address}/>
            </div>
            <div className="copy-address">
                <TextBox
                    className=""
                    value="Address"
                />
                <AddressCopy text={address}/>
            </div>
            <Address value={address}/>
        </>
    );
};

Receive.propTypes = {
    index: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        index: state.keys.index,
        items: state.keys.items,
    };
};

const actionsToProps = {};

export default connect(stateToProps, actionsToProps)(Receive);
