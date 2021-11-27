// funny stuff with bytes next to the current one
module.exports = (byte, prev, chunk, i) => {
    return (chunk[i+1] + chunk[i+2] + chunk[i+3] + chunk[i+9] + random(10)) - chunk[i] - 200 / (random(2) == 2 ? 2 : 3) + ((Math.sin((prog-100) % 360)*100)); 
}