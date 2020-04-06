import moment from 'moment';
import * as PropTypes from 'prop-types';
import React from 'react';
import { encodeToBech32 } from '../utils/encode';
import { type } from '../utils/walletType';
import Icon from './Icon';

const TransactionsList = (props) => {
    return (
        props.list && props.list.length > 0 && props.list.map((value, index) => {
            return (
                <div key={index} className="row">
                    <div className="left_content">
                        {value.messages && value.messages[0].data.to_address === props.activeAddress
                            ? <div className="details">
                                <p>{value.messages && encodeToBech32(value.messages[0].data.to_address, 'sent')}</p>
                                <Icon
                                    className="received_arrow"
                                    icon="received_arrow"/>
                                <p>{value.messages && encodeToBech32(value.messages[0].data.from_address, 'sent')}</p>
                            </div>
                            : <div className="details">
                                <p>{value.messages && encodeToBech32(value.messages[0].data.from_address, 'sent')}</p>
                                <Icon
                                    className="sent_arrow"
                                    icon="sent_arrow"/>
                                <p>{value.messages && encodeToBech32(value.messages[0].data.to_address, 'sent')}</p>
                            </div>}
                        <div className="transaction_time">
                            <p className="time_details">
                                {moment(value.block && value.block.time).format('Do MMMM YYYY, h:mm:ss a')}
                            </p>
                            {value.result && value.result.code
                                ? <Icon
                                    className="close"
                                    icon="close"/>
                                : <Icon
                                    className="check"
                                    icon="check"/>}
                        </div>
                    </div>
                    <div className="right_content">
                        <p>
                            {value.messages && value.messages[0].data.to_address === props.activeAddress
                                ? '+'
                                : '-'}
                            {value.messages && value.messages[0].data.amount[0].value * Math.pow(10, -6)}&nbsp;
                            {type(value.messages && value.messages[0].data.amount[0].denom)}
                        </p>
                    </div>
                </div>
            );
        })
    );
};

TransactionsList.propTypes = {
    list: PropTypes.array.isRequired,
};

export default TransactionsList;
