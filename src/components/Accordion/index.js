import * as PropTypes from 'prop-types';
import React from 'react';
import { Accordion } from 'react-bootstrap';
import TextBox from '../TextBox';
import VotingStart from '../../containers/Wallet/Proposals/VotingStart';
import VotingEnd from '../../containers/Wallet/Proposals/VotingEnd';
import Percentage from '../../containers/Wallet/Proposals/Percentage';
import Title from '../../containers/Wallet/Proposals/Title';
import Label from '../Label';
import Type from '../../containers/Wallet/Proposals/Type';
import TotalDeposit from '../../containers/Wallet/Proposals/TotalDeposit';
import DepositEnd from '../../containers/Wallet/Proposals/DepositEnd';
import SubmitTime from '../../containers/Wallet/Proposals/SubmitTIme';
import Description from '../../containers/Wallet/Proposals/Description';
import ButtonYes from '../../containers/Wallet/Proposals/VotingYes/ButtonYes';
import ButtonNo from '../../containers/Wallet/Proposals/VotingNo/ButtonNo';
import ButtonAbstain from '../../containers/Wallet/Proposals/Abstain/ButtonAbstain';
import ButtonWithVeto from '../../containers/Wallet/Proposals/NowithVeto/ButtonWithVeto';
import './index.css';

const AccordionContainer = ({
    proposals,
}) => {
    console.log(proposals, 'Red');
    return (
        <div className="accordion-section">
            {
                proposals.map((item, index) => (
                    <Accordion key={index}>
                        <div className="proposal-accordion">
                            <div>
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
                                    <Accordion.Toggle eventKey="0" variant="link">
                                        Open
                                    </Accordion.Toggle>
                                </div>

                            </div>
                            <Accordion.Collapse eventKey="0">
                                <div>
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
                ))
            }

        </div>
    );
};
AccordionContainer.propTypes = {
    proposals: PropTypes.array.isRequired,
};
export default AccordionContainer;
