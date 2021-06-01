import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

    return (
        <>
            <TextBox
                className="qr-title"
                value="Show QR code to Receive Amount"/>
            <div className="qr-box">
                <QRCode value={item.address}/>
            </div>
            <div className="copy-address">
                <TextBox
                    className=""
                    value="Address"
                />
                <AddressCopy text={item.address}/>
            </div>
            <Address value={item.address}/>
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
