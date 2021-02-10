import './index.css';
import * as PropTypes from 'prop-types';
import { emptyFunc } from '../../constants/common';
import Icon from '../Icon';
import React from 'react';

const Header = ({
    columns,
    onClick,
    sort,
}) => {
    return (
        <thead>
            <tr>
                <th></th>
                {
                    columns.map((item, index) => (
                        <th
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
                        </th>
                    ))
                }
            </tr>
        </thead>
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
