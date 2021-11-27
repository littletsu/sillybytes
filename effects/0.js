module.exports = (byte, prev) => {
    return (((((prev - byte) + 22) >> 3) + 11)/3) + prev || (prev << byte) ;
};