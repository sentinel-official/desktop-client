import React from 'react';
import { Accordion } from 'react-bootstrap';
import TextBox from '../../../components/TextBox';
import Title from './Title';
import VotingStart from './VotingStart';
import VotingEnd from './VotingEnd';
import Percentage from './Percentage';
import Label from '../../../components/Label';
import TotalDeposit from './TotalDeposit';
import Type from './Type';
import DepositEnd from './DepositEnd';
import SubmitTime from './SubmitTIme';
import Description from './Description';
import ButtonYes from './VotingYes/ButtonYes';
import ButtonNo from './VotingNo/ButtonNo';
import ButtonAbstain from './Abstain/ButtonAbstain';
import ButtonWithVeto from './NowithVeto/ButtonWithVeto';

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
                            <Accordion key={index}>
                                <div className="proposal-accordion">
                                    <div className="accordion-header">
                                        <div className="flex-item">
                                            <div className="serial-number">
                                                <TextBox className="number" value={item.key}/>
                                            </div>
                                            <Title/>
                                        </div>
                                        <div className="flex-box">
                                            <div className="horizontal-list">
                                                <TextBox className="horizontal-list-label" value="Voting Start"/>
                                                <VotingStart/>
                                            </div>
                                            <div className="horizontal-list">
                                                <TextBox className="horizontal-list-label" value="Voting End"/>
                                                <VotingEnd/>
                                            </div>
                                            <div className="horizontal-list">
                                                <TextBox className="horizontal-list-label" value="Most Voted On"/>
                                                <Percentage/>
                                            </div>
                                            <Accordion.Toggle className="button-accordion" eventKey="0" variant="link">
                                                Open
                                            </Accordion.Toggle>`
                                        </div>

                                    </div>
                                    <Accordion.Collapse eventKey="0">
                                        <div className="collapse-content">
                                            <div className="flex-item">
                                                <Label className="" label="Total Deposit"/>
                                                <TotalDeposit/>
                                            </div>
                                            <div className="flex-item">
                                                <Label className="" label="Type"/>
                                                <Type/>
                                            </div>
                                            <div className="flex-item">
                                                <Label className="" label="Deposit End Time"/>
                                                <DepositEnd/>
                                            </div>
                                            <div className="flex-item">
                                                <Label className="" label="Submit Time"/>
                                                <SubmitTime/>
                                            </div>
                                            <div className="horizontal-list">
                                                <Label className="" label="Description"/>
                                                <Description/>
                                            </div>
                                            <div className="buttons-list flex-center">
                                                <ButtonYes/>
                                                <ButtonNo/>
                                                <ButtonAbstain/>
                                                <ButtonWithVeto/>
                                            </div>
                                        </div>
                                    </Accordion.Collapse>
                                </div>
                            </Accordion>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Proposals;
