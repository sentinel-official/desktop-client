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
        <div className="accordion-scroll-bar">
            <div className="accordion-section">
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
            </div>
        </div>
    );
};

export default Proposals;
