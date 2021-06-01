import './index.css';
import * as PropTypes from 'prop-types';
import { emptyFunc } from '../../constants/common';
import Icon from '../Icon';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Header = ({
    columns,
    onClick,
    sort,
}) => {
    return (
        <TableHead>
            <TableRow>
                {
                    columns.map((item, index) => (
                        <TableCell
                            key={index}
                            onClick={item.sort ? () => onClick(item.key) : emptyFunc}>
                            <div className="sort">
                                {item.label}
                                {
                                    item.key === sort.by
                                        ? sort.order === 'asc'
                                            ? <div className="sort-icon">
                                                <Icon
                                                    className="arrow-up"
                                                    icon="arrowUp"/>
                                            </div>
                                            : <div className="sort-icon">
                                                <Icon
                                                    className="arrowDown"
                                                    icon="arrowDown"/>
                                            </div>
                                        : null
                                }
                            </div>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
};

Header.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            sort: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    sort: PropTypes.shape({
        by: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Header;
