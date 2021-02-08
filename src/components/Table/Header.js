import * as PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import './index.css';

const Header = ({ columns }) => {
    const onClick = (by, order) => {
    };
    const ascending = false;
    return (
        <thead>
            <tr>
                <th></th>
                {
                    columns.map((item) => (
                        <th
                            key={item.id}
                            onClick={() => onClick(item.id, 'ascending')}>
                            <div className="sort">
                                {item.label}
                                {
                                    item.id === 'Moniker' /* sortBy */
                                        ? <div className="sort-icon">
                                            {
                                                ascending
                                                    ? <Icon
                                                        className="arrow-up"
                                                        icon="arrowUp"/>
                                                    : <Icon
                                                        className="arrowDown"
                                                        icon="arrowDown"/>
                                            }
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
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Header;
