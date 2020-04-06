import { makeStyles, TextField as MaterialTextField } from '@material-ui/core';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#1B253A',
            },
        },
    },
}));

const TextField = (props) => {
    const onChange = (e) => {
        props.onChange(e.target.value);
    };

    return (
        <MaterialTextField
            className={classNames(useStyles().root, 'text_field', props.className ? props.className : '')}
            error={props.error}
            helperText={props.error ? props.errorText : ''}
            id={props.id}
            InputProps={props.inputProps ? props.inputProps : null}
            margin="normal"
            name={props.name}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            variant="outlined"
            onChange={onChange}/>
    );
};

TextField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    inputProps: PropTypes.object,
    placeholder: PropTypes.string,
};

export default TextField;
