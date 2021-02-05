import React from 'react';
import DownloadLink from 'react-download-link';
import Icon from '../../components/Icon';

const DownloadSeed = () => {
    const content = 'cosmosaccaddr1q0sxllakn9eh75nl2cntvfwnegxqfljjmeggj7';
    const downloadIcon = <Icon
        className="icon"
        icon="download"
    />;
    return (
        <DownloadLink
            exportFile={() => content}
            filename="key.json"
            label={downloadIcon}
        />
    );
};

export default DownloadSeed;
