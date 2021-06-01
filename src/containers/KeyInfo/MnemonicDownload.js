import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DownloadLink from 'react-download-link';
import Icon from '../../components/Icon';
import React from 'react';

const MnemonicDownload = (props) => {
    return (
        <DownloadLink
            exportFile={() => props.mnemonic}
            filename={`${props.address}.txt`}
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
