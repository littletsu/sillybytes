// if byte is the same as the previous return 0, otherwise return the byte
module.exports = (byte, prev) => {
    return byte === prev ? 0 : byte
}