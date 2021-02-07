import React from 'react';
import TextBox from '../../components/TextBox';

const Balance = () => {
    return (
        <div className="token-info">
            <TextBox
                className="sent-title"
                value="Sent"
            />
            <div className="sent-list">
                <TextBox
                    className="heading"
                    value="0"
                />
                <TextBox
                    className="value"
                    value="(= $0 USD)"
                />
            </div>
        </div>
    );
};

export default Balance;
