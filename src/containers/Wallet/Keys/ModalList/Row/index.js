import { connect } from 'react-redux';
import { encodeToBech32 } from '../../../../../utils/bech32';
import { setKeysDeleteNameSet } from '../../../../../actions/keys';
import Collapse from '@material-ui/core/Collapse';
import Delete from './Delete';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Image from '../../../../../components/Image';
import Profile from '../../../../../assets/Profile.svg';
import PropTypes from 'prop-types';
import React from 'react';
import Select from './Select';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Row = ({
    active,
    expand,
    item: {
        name,
        address,
    },
    setKeysDeleteNameSet,
    putConfigurationInProgress,
}) => {
    address = encodeToBech32(address, 'sent');

    const onClickDelete = () => {
        if (name === expand) {
            return;
        }

        setKeysDeleteNameSet(name);
    };

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <Image
                        alt="moniker-image"
                        className="moniker-image"
                        src={Profile}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
                <TableCell>
                    {address}
                </TableCell>
                <TableCell>
                    {
                        name === active
                            ? null
                            : <Select
                                active={active}
                                expand={expand}
                                name={name}
                            />
                    }
                </TableCell>
                <TableCell>
                    {
                        name === active
                            ? null
                            : <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={onClickDelete}>
                                <DeleteIcon/>
                            </IconButton>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    colSpan={6}
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                    }}>
                    <Collapse
                        in={putConfigurationInProgress === false && name !== active && name === expand}
                        timeout="auto"
                        unmountOnExit={true}>
                        <Delete/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

Row.propTypes = {
    active: PropTypes.string.isRequired,
    expand: PropTypes.string.isRequired,
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
    putConfigurationInProgress: PropTypes.bool.isRequired,
    setKeysDeleteNameSet: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        active: state.keys.name,
        expand: state.keys.delete.name,
        putConfigurationInProgress: state.configuration.put.inProgress,
    };
};

const actionsToProps = {
    setKeysDeleteNameSet,
};

export default connect(stateToProps, actionsToProps)(Row);
