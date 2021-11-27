module.exports = (byte, prev) => {
    return (byte > 50 ? (((byte - 5) * 2) + 2) * (prev > 6 ? prev + 2 : prev) : (((byte + 5)) * 3) + (prev > 6 ? prev / 2 : prev)) / 3
};