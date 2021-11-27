module.exports = (byte, prev) => {
    return (((prev + 22) / 2) - 5) - byte;
}