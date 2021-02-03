import * as PropTypes from 'prop-types';
import React from 'react';
import ChipButton from '../../../components/ChipButton';

const options = [
    'Active',
    'Inactive',
];

const ValidatorState = (props) => {
    const onClick = () => {

    };

    return (
        <div className="button-group buttons-state">
            {
                options.map((item) => {
                    return (
                        <ChipButton
                            key={item}
                            className={props.value === item ? 'active' : 'primary'}
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

ValidatorState.propTypes = {
    value: PropTypes.string.isRequired,
};

export default ValidatorState;
