import Bech32 from 'bech32';

export const encodeToBech32 = (key, prefix) => {
    if (key === undefined || key === '') {
        return '';
    }
    if (prefix === undefined || prefix === '') {
        return new Error('prefix is empty');
    }

    try {
        const words = Bech32.toWords(Buffer.from(key, 'hex'));
        return Bech32.encode(prefix, words);
    } catch (e) {
        return e;
    }
};

export const decodeFromBech32 = (key) => {
    if (key === undefined || key === '') {
        return new Error('key is empty');
    }

    try {
        const decoded = Bech32.decode(key);
        return Buffer.from(Bech32.fromWords(decoded.words))
            .toString('hex')
            .toUpperCase();
    } catch (e) {
        return e;
    }
};
