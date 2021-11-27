// if byte is more than 127 return 255, otherwise just return the byte
module.exports = (byte) => {
    return byte > 127 ? 255 : byte;
};