import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import CopyToClipboard from '../../../../../../components/GeneratedSeed/Clipboard';
import variables from '../../../../../../dummy/variables';
import { encodeToBech32 } from '../../../../../../utils/encode';
import './index.css';
import ReceiverQrCode from './ReceiverQrCode';

const Receive = (props) => {
    return (
        <div className="receive_transaction">
            <div className="qr_code_div">
                <p className="text_field_label">{variables[props.lang].show_qr}</p>
                <ReceiverQrCode/>
                <div className="row">
                    <p className="heading_text">{variables[props.lang].address}:</p>
                    <CopyToClipboard data={encodeToBech32(props.address, 'sent')}/>
                </div>
                <p className="note_text"><b>{variables[props.lang].note}:</b>{variables[props.lang].scan_qr}</p>
            </div>
        </div>
    );
};

Receive.propTypes = {
    address: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.keys.activeAccount.address,
        lang: state.language,
    };
};

export default connect(stateToProps)(Receive);
