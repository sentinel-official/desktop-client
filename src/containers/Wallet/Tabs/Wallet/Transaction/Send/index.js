import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showWallet, tokensTransfer } from '../../../../../../actions/wallet';
import variables from '../../../../../../dummy/variables';
import { decodeFromBech32 } from '../../../../../../utils/encode';
import AddressTextField from './AddressTextField';
import GasPrice from './GasPrice';
import './index.css';
import PasswordTextField from './PasswordTextField';
import SendButton from './SendButton';
import TokensSelectField from './TokensSelectField';
import TokensTextField from './TokensTextField';

const Send = (props) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !disable) {
            handleSend();
        }
    };

    const handleSend = () => {
        const data = {
            from: props.name,
            from_address: props.fromAddress,
            to_address: decodeFromBech32(props.addressToSend),
            amount: [{
                denom: props.token,
                value: parseInt(props.tokensToSend) * Math.pow(10, 6),
            }],
            password: props.password,
            gas: parseInt(props.gasPrice),
        };

        props.tokensTransfer(data, (error) => {
            if (!error) {
                props.showWallet();
            }
        });
    };

    const disable = props.addressToSend === '' || props.password === '' || props.token === '' ||
        props.tokensToSend === '' || props.inProgress;

    return (
        <form noValidate autoComplete="off" className="send_transaction" onKeyPress={handleKeyPress}>
            <div>
                <p className="text_field_label">{variables[props.lang].address_to_send}</p>
                <AddressTextField/>
            </div>
            <div>
                <p className="text_field_label">{variables[props.lang].tokens_to_send}</p>
                <div className="row">
                    <TokensTextField/>
                    <TokensSelectField/>
                </div>
            </div>
            <div>
                <p className="text_field_label">{variables[props.lang].gas_price} <span
                    className="text_normal">(tsent)</span></p>
                <GasPrice/>
            </div>
            <div>
                <p className="text_field_label">{variables[props.lang].password}</p>
                <PasswordTextField/>
            </div>
            <div className="button_div">
                <SendButton disable={disable} onClick={handleSend}/>
            </div>
        </form>
    );
};

Send.propTypes = {
    addressToSend: PropTypes.string.isRequired,
    fromAddress: PropTypes.string.isRequired,
    gasPrice: PropTypes.string.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    showWallet: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    tokensToSend: PropTypes.string.isRequired,
    tokensTransfer: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        addressToSend: state.wallet.transactions.send.addressToSend,
        inProgress: state.wallet.transactions.send.inProgress,
        fromAddress: state.keys.activeAccount.address,
        name: state.keys.activeAccount.name,
        tokensToSend: state.wallet.transactions.send.tokensToSend,
        token: state.wallet.transactions.send.token,
        gasPrice: state.wallet.transactions.send.gasPrice,
        password: state.wallet.transactions.send.password,
        lang: state.language,
    };
};

const actionsToProps = {
    showWallet,
    tokensTransfer,
};

export default connect(stateToProps, actionsToProps)(Send);
