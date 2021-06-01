export const isActive = (item) => {
    return item.jailed === false && item.status === 'BOND_STATUS_BONDED';
};
