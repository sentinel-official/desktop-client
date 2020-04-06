import * as PropTypes from 'prop-types';
import React from 'react';
import variables from '../../dummy/variables';
import { encodeToBech32 } from '../../utils/encode';
import CopyToClipboard from './Clipboard';

const GeneratedSeed = (props) => {
    return (
        <div className="copy_box">
            <div className="row">
                <p className="heading">{variables[props.lang].address}</p>
                <CopyToClipboard data={encodeToBech32(props.address, 'sent')}/>
            </div>
            <div className="row">
                <p className="heading">{variables[props.lang].pub_key}</p>
                <CopyToClipboard data={encodeToBech32(props.pubKey, 'sentpub')}/>
            </div>
            <div className="row">
                <p className="heading">{variables[props.lang].seed}</p>
                <div className="seed_div">
                    <p className="seed_text">{props.mnemonic}</p>
                </div>
            </div>
        </div>
    );
};

GeneratedSeed.propTypes = {
    address: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    mnemonic: PropTypes.string.isRequired,
    pubKey: PropTypes.string.isRequired,
};

export default GeneratedSeed;
