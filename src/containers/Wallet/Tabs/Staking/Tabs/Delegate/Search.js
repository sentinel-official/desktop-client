import { InputAdornment } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setSearchList } from '../../../../../../actions/delegate';
import Icon from '../../../../../../components/Icon';
import TextField from '../../../../../../components/TextField';
import '../../../../../../components/TextField/search.css';
import variables from '../../../../../../dummy/variables';

const Search = (props) => {
    return (
        <TextField
            className="search"
            id="delegate_search_text_field"
            inputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <Icon
                            className="search"
                            icon="search"/>
                    </InputAdornment>,
            }}
            name="validatorsList"
            placeholder={variables[props.lang].search}
            type="text"
            value={props.value}
            onChange={props.onChange}/>
    );
};

Search.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.staking.delegate.searchList,
    };
};

const actionsToProps = {
    onChange: setSearchList,
};

export default connect(stateToProps, actionsToProps)(Search);
