import Lodash from 'lodash';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import SelectField from '../../../components/SelectField';

const Validators = ({
    delegations,
    validators,
}) => {
    const onChange = (event) => {
    };

    const items = [];
    validators.forEach((validator) => {
        const delegation = Lodash.find(delegations, ['validator_address', validator.address]);
        if (delegation) {
            items.push({
                ...validator,
                delegation,
            });
        }
    });

    return (
        <SelectField
            className="form-control"
            items={items}
            onChange={onChange}
        />
    );
};

Validators.propTypes = {
    delegations: PropTypes.arrayOf(
        PropTypes.shape({
            validator_address: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    validators: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
            description: PropTypes.shape({
                moniker: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        delegations: state.delegations.items,
        validators: state.validators.items,
    };
};

export default connect(stateToProps)(Validators);
