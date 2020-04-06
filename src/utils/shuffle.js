const shuffle = (a) => {
    const b = [...a];
    const arr1 = [...a];
    for (let i = a.length; i; i--) {
        const j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    a = a.slice(0, Math.floor(Math.random() * 3 + 4));
    b.map((value, index) =>
        a.filter((item) => {
            return (
                item === value && arr1.splice(index, 1, ' ')
            );
        }),
    );
    arr1.map((value, index) => {
        let item = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i < value.length - 1) {
                item += '*';
            } else {
                item += value[i];
            }
        }
        return arr1.splice(index, 1, item);
    });
    return arr1;
};

export default shuffle;
