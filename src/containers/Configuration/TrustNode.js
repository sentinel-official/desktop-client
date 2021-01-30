import * as PropTypes from 'prop-types';
import React from 'react';
import ChipButton from '../../components/ChipButton';

const options = [
    'Yes',
    'No',
];

const TrustNode = (props) => {
    const onClick = () => {

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

TrustNode.propTypes = {
    value: PropTypes.string.isRequired,
};

export default TrustNode;
