import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { encodeToBech32 } from '../../../utils/bech32';
import Address from './Address';
import AddressCopy from './AddressCopy';
import Lodash from 'lodash';
import QRCode from './QRCode';
import React from 'react';
import TextBox from '../../../components/TextBox';

const Receive = ({
    name,
    items,
}) => {
    const item = Lodash.find(items, ['name', name]);
    const address = encodeToBech32(item.address, 'sent');

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
    items: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    name: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        name: state.keys.name,
        items: state.keys.items,
    };
};

const actionsToProps = {};

export default connect(stateToProps, actionsToProps)(Receive);
