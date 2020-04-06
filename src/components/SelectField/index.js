import { makeStyles, MenuItem, TextField } from '@material-ui/core';
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

const SelectField = (props) => {
    const onChange = (e) => props.onChange(e.target.value);

    return (
        <TextField
            select
            className={classNames(useStyles().root, 'select_field')}
            id={props.id}
            margin="normal"
            name={props.name}
            value={props.value}
            variant="outlined"
            onChange={onChange}>
            {
                props.items.map((item) => (
                    <MenuItem
                        key={item.key || item.value || item.name}
                        value={item.value || item.name}>
                        {item.img}
                        {item.name}
                    </MenuItem>
                ))
            }
        </TextField>
    );
};

SelectField.propTypes = {
    id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            name: PropTypes.string.isRequired,
            value: PropTypes.string,
            img: PropTypes.element,
        }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectField;
