import * as PropTypes from 'prop-types';
import React from 'react';
import DownloadLink from 'react-download-link';
import { connect } from 'react-redux';
import Icon from '../../components/Icon';
import { encodeToBech32 } from '../../utils/bech32';

const MnemonicDownload = (props) => {
    const address = encodeToBech32(props.address, 'sent');

    return (
        <DownloadLink
            exportFile={() => props.mnemonic}
            filename={`${address}.txt`}
            label={
                <Icon
                    className="icon"
                    icon="download"
                />
            }
        />
    );
};

MnemonicDownload.propTypes = {
    address: PropTypes.string.isRequired,
    mnemonic: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        address: state.keys.post.info.address,
        mnemonic: state.keys.post.info.mnemonic,
    };
};

export default connect(stateToProps)(MnemonicDownload);
