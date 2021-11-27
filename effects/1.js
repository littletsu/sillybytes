module.exports = (byte, prev) => {
    return ((((byte + prev - 5) / 6)) - 7) * 3;
};