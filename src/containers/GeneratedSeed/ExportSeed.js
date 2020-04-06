import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icon from '../../components/Icon';
import { encodeToBech32 } from '../../utils/encode';

const ExportSeed = (props) => {
    const file = {
        pub_key: props.pubKey && encodeToBech32(props.pubKey, 'sentpub'),
        address: props.address && encodeToBech32(props.address, 'sent'),
        mnemonic: props.mnemonic,
    };

    return (
        <Button className="active_button">
            <a
                download={file.address ? file.address + '.txt' : 'seed.txt'}
                href={window.URL.createObjectURL(new Blob([JSON.stringify(file)], { type: 'text/csv' }))}>
                Export Seed
                <Icon className="export" icon="export"/>
            </a>
        </Button>
    );
};

ExportSeed.propTypes = {
    address: PropTypes.string.isRequired,
    mnemonic: PropTypes.string.isRequired,
    pubKey: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        pubKey: state.account.new.pubKey,
        address: state.account.new.address,
        mnemonic: state.account.new.mnemonic,
    };
};

export default connect(stateToProps)(ExportSeed);
