import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import QrCode from '../../../../../../components/QrCode';
import { encodeToBech32 } from '../../../../../../utils/encode';

const ReceiverQrCode = (props) => {
    return <QrCode value={encodeToBech32(props.address, 'sent')}/>;
};

ReceiverQrCode.propTypes = {
    address: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.keys.activeAccount.address,
    };
};

export default connect(stateToProps)(ReceiverQrCode);
