import BigNumber from 'bignumber.js';

export default BigNumber.clone({
    DECIMAL_PLACES: 1e9,
    EXPONENTIAL_AT: 1e9,
    POW_PRECISION: 1e9,
});
