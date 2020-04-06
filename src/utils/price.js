const price = (value) => {
    let amount = Number(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, Number(10000).toLocaleString().substring(2, 3)).toString().split('.');

    if (amount[1]) {
        amount[1] = amount[1].split(',').join('');
        amount = amount.join('.');
    } else {
        amount = amount.join('');
    }

    return amount;
};

export default price;
