import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setMissingSeed, setSeedValues } from '../../../actions/account';
import CopyToClipboard from '../../../components/GeneratedSeed/Clipboard';
import variables from '../../../dummy/variables';
import { encodeToBech32 } from '../../../utils/encode';
import shuffle from '../../../utils/shuffle';
import './index.css';
import MissingSeedTextField from './MissingSeedTextField';

const Seed = (props) => {
    const missingSeed = () => {
        const array = shuffle(props.mnemonic.split(' '));
        let count = 0;
        const missingIndex = [];
        let seedValues = {};
        const value = array.map((value, index) => {
            if (value === ' ') {
                missingIndex.push(index);
                count = count + 1;
                seedValues = {
                    ...seedValues,
                    ['text' + count]: '',
                };
                return <MissingSeedTextField key={index} index={count}/>;
            } else {
                return <p key={index} className="seed_text">{value}</p>;
            }
        });
        props.setSeedValues(seedValues);
        props.setMissingSeed(missingIndex);
        return value;
    };

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
            <div className="missing_seed_title">
                <p>{variables[props.lang].enter_missing_seed}</p>
            </div>
            <div className="row">
                <p className="heading">{variables[props.lang].seed}</p>
                <div className="seed_div missing_seed">
                    {missingSeed()}
                </div>
            </div>
        </div>
    );
};

Seed.propTypes = {
    address: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    mnemonic: PropTypes.string.isRequired,
    pubKey: PropTypes.string.isRequired,
    setMissingSeed: PropTypes.func.isRequired,
    setSeedValues: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        pubKey: state.account.new.pubKey,
        address: state.account.new.address,
        mnemonic: state.account.new.mnemonic,
    };
};

const actionsToProps = {
    setMissingSeed,
    setSeedValues,
};

export default connect(stateToProps, actionsToProps)(Seed);
