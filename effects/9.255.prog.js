// if byte is the same as the previous return prog, otherwise return the byte inverted (-255)
module.exports = (byte, prev) => {
    return byte === prev ? prog : 255-byte
}