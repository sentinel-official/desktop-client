const wallet = (value) => {
    const amount = Number(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, Number(10000).toLocaleString().substring(2, 3)).toString().split('.');
    if (amount[1]) {
        amount[1] = amount[1].split(',').join('');
    }

    return amount;
};

export default wallet;
