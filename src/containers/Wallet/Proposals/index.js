import React from 'react';
import Row from './Row';

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

const Proposals = () => {
    return (
        <>
            {
                proposals.map((item, index) => {
                    return (
                        <Row
                            key={index}
                            index={index}
                        />
                    );
                })
            }
        </>
    );
};

export default Proposals;
