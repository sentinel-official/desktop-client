export const isActive = (item) => {
    return item.jailed === false && item['bond_status'] === 'Bonded';
};
