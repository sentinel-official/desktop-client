import moment from 'moment';
import * as PropTypes from 'prop-types';
import React from 'react';
import { removeUnderScore } from '../utils/otherTransactions';
import { type } from '../utils/walletType';
import Icon from './Icon';

const List = (props) => {
    return (
        <div className="row">
            <div className="left_content">
                <div className="details">
                    <p className="hash">
                        {props.value.hash && props.value.hash}
                        {props.failed
                            ? <Icon className="close" icon="close"/>
                            : <Icon
                                className="check"
                                icon="check"/>}
                    </p>
                </div>
                <p className="time_details">
                    {moment(props.value.block && props.value.block.time).format('Do MMMM YYYY, h:mm:ss a')}
                </p>
            </div>
            <div className="right_content">
                <p>
                    <b>{removeUnderScore(props.type)}{props.tokens ? ':' : ''}</b>
                    {props.tokens &&
                    props.tokens.value * Math.pow(10, -6) + ' ' + type(props.tokens.denom)}
                </p>
            </div>
        </div>
    );
};

List.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    failed: PropTypes.string,
    tokens: PropTypes.object,
};

export default List;
