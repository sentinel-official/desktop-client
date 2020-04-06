import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as PropTypes from 'prop-types';
import React from 'react';
import { encodeToBech32 } from '../../utils/encode';
import '../TextField/index.css';
import './index.css';

const AutoComplete = (props) => {
    return (
        <div className="auto_complete">
            <Autocomplete
                classes={{
                    popper: 'auto_complete_popper',
                }}
                getOptionLabel={(option) => encodeToBech32(option.address, 'sentvaloper')}
                id={'auto_complete_' + props.id}
                options={props.options}
                renderInput={(params) => (
                    <TextField className="text_field" {...params} fullWidth variant="outlined"/>
                )}
                renderOption={(option) => option.title}
                onChange={(event, newValue) => {
                    if (newValue === null) {
                        props.onChange({});
                    } else {
                        props.onChange(newValue);
                    }
                }}
            />
        </div>
    );
};

AutoComplete.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default AutoComplete;
