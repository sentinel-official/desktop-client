import * as PropTypes from 'prop-types';
import React from 'react';
import ChipButton from '../../components/ChipButton';

const options = [
    'Block',
    'Sync',
    'Async',
];

const BroadcastMode = (props) => {
    const onClick = (event) => {

    };

    return (
        <div className="button-group">
            {
                options.map((item) => {
                    return (
                        <ChipButton
                            key={item}
                            className={props.value === item ? 'selected' : 'primary'}
                            type="button"
                            value={item}
                            onClick={onClick}
                        />
                    );
                })
            }
        </div>
    );
};

BroadcastMode.propTypes = {
    value: PropTypes.string.isRequired,
};

export default BroadcastMode;
