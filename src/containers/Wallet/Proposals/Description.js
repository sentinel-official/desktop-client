import React from 'react';
import TextBox from '../../../components/TextBox';

const Description = () => {
    const Description = 'The purpose of this proposal is to restore access to geneis ATOMs for a subset of donors who have been active participants in our community through the last year.\n' +
        'The view of iqlusion is that this is an important moment for the Cosmos Hub. Stargate brings the fundraiser period to the end with delivery of IBC. This proposal resolves the open business of active members of our community who cannot access their ATOM. This is an opportunity is opporunity to bring this business to a close and setup the agenda for IBC powered innovation comming in 2021.We strongly encourage the Cosmos Community to verify the cryptographic evidence and bring these community members to full ATOM holder status.\n';
    return (
        <div className="receive-address">
            <TextBox
                className=""
                value={Description}
            />
        </div>

    );
};

export default Description;
