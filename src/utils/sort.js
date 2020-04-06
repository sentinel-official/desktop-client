const sort = (array, order, orderBy) => {
    let sortedArray = array;
    if (order === 'asc') {
        sortedArray = array.sort((a, b) => {
            if (a[orderBy] > b[orderBy]) {
                return 1;
            }
            if (a[orderBy] < b[orderBy]) {
                return -1;
            }
            return 0;
        });
    } else {
        sortedArray = array.sort((a, b) => {
            if (a[orderBy] > b[orderBy]) {
                return -1;
            }
            if (a[orderBy] < b[orderBy]) {
                return 1;
            }
            return 0;
        });
    }

    return sortedArray;
};

export default sort;
