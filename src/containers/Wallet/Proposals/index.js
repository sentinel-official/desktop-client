import React from 'react';
import AccordionContainer from '../../../components/Accordion';
const Proposals = () => {
    const proposals = [
        {
            label: 'Moniker',
            key: '1',
        },
        {
            label: 'Voting Power',
            key: '2',
        },
        {
            label: 'Self',
            key: '3',
        },
    ];

    return (
        <AccordionContainer
            proposals={proposals}
        />
    );
};

export default Proposals;
