import bech32 from 'bech32';

export const encodeToBech32 = (key, prefix) => {
    let address;

    try {
        address = bech32.toWords(Buffer.from(key, 'hex'));
        return bech32.encode(prefix, address);
    } catch (e) {
        return '';
    }
};

export const decodeFromBech32 = (key) => {
    let decoded;

    try {
        decoded = bech32.decode(key);
        return Buffer.from(bech32.fromWords(decoded.words)).toString('hex').toUpperCase();
    } catch (e) {
        return '';
    }
};
