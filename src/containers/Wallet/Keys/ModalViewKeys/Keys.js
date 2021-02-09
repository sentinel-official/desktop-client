import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import Icon from '../../../../components/Icon';
import Label from '../../../../components/Label';
import Delete from '../DeleteKey/Delete';
import Password from '../DeleteKey/Password';
import SelectKey from './SelectKey';

const list = [
    {
        name: 'key1',
        address: 'cosmosoer01823081238012830948khasdkfasd343',
    },
    {
        name: 'key2',
        address: 'cosmosoer01823081238012830948khasdkfasd343',
    },
];
const Keys = () => {
    return (
        <div className="key-group">
            {
                list.map((item, index) => {
                    return (
                        <Accordion key={index}>
                            <Card>
                                <Card.Header>
                                    <div className="key flex-box">
                                        <div className="key-name">
                                            <p className="m-0">{item.name}</p>
                                        </div>
                                        <div className="key-address">
                                            <p className="m-0">{item.address}</p>
                                        </div>
                                        <SelectKey/>
                                        <Accordion.Toggle className="button-accordion" eventKey="0" variant="link">
                                            <Icon className="delete" icon="delete"/>
                                        </Accordion.Toggle>
                                    </div>

                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div className="form-group">
                                            <Label className="label" label="password"/>
                                            <Password/>
                                        </div>
                                        <Delete/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    );
                })
            }
        </div>
    );
};

export default Keys;
