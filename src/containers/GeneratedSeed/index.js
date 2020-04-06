import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import GeneratedSeed from '../../components/GeneratedSeed';
import variables from '../../dummy/variables';
import ContinueButton from './ContinueButton';
import ExportSeed from './ExportSeed';
import './index.css';

const WalletSeed = (props) => {
    return (
        <div className="wallet_seed">
            <p className="heading_text">{variables[props.lang].wallet_successful}</p>
            <GeneratedSeed address={props.address} lang={props.lang} mnemonic={props.mnemonic} pubKey={props.pubKey}/>
            <div className="button_div">
                <div className="export_button">
                    <ContinueButton/>
                    <ExportSeed/>
                </div>
                <p className="note_text"><b>{variables[props.lang].note}:</b>{variables[props.lang].copy_keys}</p>
            </div>
        </div>
    );
};

WalletSeed.propTypes = {
    address: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    mnemonic: PropTypes.string.isRequired,
    pubKey: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        pubKey: state.account.new.pubKey,
        address: state.account.new.address,
        mnemonic: state.account.new.mnemonic,
    };
};

export default connect(stateToProps)(WalletSeed);
