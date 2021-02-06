import * as PropTypes from 'prop-types';
import React from 'react';
import { Accordion } from 'react-bootstrap';
import Label from '../../../../components/Label';
import TextBox from '../../../../components/TextBox';
import ButtonAbstain from './ButtonAbstain';
import ButtonNo from './ButtonNo';
import ButtonNoWithVeto from './ButtonNoWithVeto';
import ButtonYes from './ButtonYes';
import DepositEnd from './DepositEnd';
import Description from './Description';
import Percentage from './Percentage';
import SubmitTime from './SubmitTIme';
import Title from './Title';
import TotalDeposit from './TotalDeposit';
import Type from './Type';
import VotingEnd from './VotingEnd';
import VotingStart from './VotingStart';

const Row = (props) => {
    return (
        <Accordion key={props.index}>
            <div className="proposal-accordion">
                <div className="accordion-header">
                    <div className="flex-item">
                        <div className="serial-number">
                            <TextBox
                                className="number"
                                value={props.key}
                            />
                        </div>
                        <Title/>
                    </div>
                    <div className="flex-box">
                        <div className="horizontal-list">
                            <TextBox
                                className="horizontal-list-label"
                                value="Voting Start"
                            />
                            <VotingStart/>
                        </div>
                        <div className="horizontal-list">
                            <TextBox
                                className="horizontal-list-label"
                                value="Voting End"
                            />
                            <VotingEnd/>
                        </div>
                        <div className="horizontal-list">
                            <TextBox
                                className="horizontal-list-label"
                                value="Most Voted On"
                            />
                            <Percentage/>
                        </div>
                        <Accordion.Toggle
                            eventKey="0"
                            variant="link">
                            Open
                        </Accordion.Toggle>
                    </div>
                </div>
                <Accordion.Collapse eventKey="0">
                    <div className="collapse-content">
                        <div className="flex-item">
                            <Label
                                className=""
                                label="Total Deposit"
                            />
                            <TotalDeposit/>
                        </div>
                        <div className="flex-item">
                            <Label
                                className=""
                                label="Type"
                            />
                            <Type/>
                        </div>
                        <div className="flex-item">
                            <Label
                                className=""
                                label="Deposit End Time"
                            />
                            <DepositEnd/>
                        </div>
                        <div className="flex-item">
                            <Label
                                className=""
                                label="Submit Time"
                            />
                            <SubmitTime/>
                        </div>
                        <div className="horizontal-list">
                            <Label
                                className=""
                                label="Description"
                            />
                            <Description/>
                        </div>
                        <div className="buttons-list flex-center">
                            <ButtonYes/>
                            <ButtonNo/>
                            <ButtonAbstain/>
                            <ButtonNoWithVeto/>
                        </div>
                    </div>
                </Accordion.Collapse>
            </div>
        </Accordion>
    );
};

Row.propTypes = {
    index: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired,
};

export default Row;
