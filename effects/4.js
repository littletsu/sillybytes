// math.sin and other stuff with next bytes
module.exports = (byte, prev, chunk, i) => {
    return (((Math.floor(Math.sin(prev) * 70) + byte)) + prev) + chunk[i+4];
};