// does a lot of stuff with next and previous bytes depending on the current one
module.exports = (byte, prev, chunk, i) => {
    return byte < 127 ? (chunk[i*10]) || (byte - (prog % 21)) || byte : byte > 55 ? byte == 33 ? chunk[i-10] || 127 : prev + 11 : 0;
}