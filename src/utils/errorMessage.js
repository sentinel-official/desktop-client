const transactionErrorMsg = (value) => {
    const arr = value.split('"');

    return arr[arr.length - 2];
};

export default transactionErrorMsg;
