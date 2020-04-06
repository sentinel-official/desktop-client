import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setSeed } from '../../../../../actions/navbar';
import Icon from '../../../../../components/Icon';
import './index.css';

const ImportButton = (props) => {
    const handleImportFile = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const seed = (JSON.parse(e.target.result));
            if (seed.mnemonic) {
                props.setSeed(seed.mnemonic);
            }
        };
        reader.readAsText(e.target.files[0]);
    };

    return (
        <Button className="import_button active_button">
            <input
                type="file"
                onChange={handleImportFile}/>
            Import Seed
            <Icon
                className="import"
                icon="import"/>
        </Button>
    );
};

ImportButton.propTypes = {
    address: PropTypes.string.isRequired,
    mnemonic: PropTypes.string.isRequired,
    pubKey: PropTypes.string.isRequired,
    setSeed: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        pubKey: state.account.new.pubKey,
        address: state.account.new.address,
        mnemonic: state.account.new.mnemonic,
    };
};

const actionToProps = {
    setSeed,
};

export default connect(stateToProps, actionToProps)(ImportButton);
