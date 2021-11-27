const fs = require('fs');
const commands = require('./commands');

const err = (msg) => {
    console.error(msg);
    process.exit();
}
const displayHelp = (m='') => {
    console.log(`${m}\nHelp:\n${commands.sort((a,b) => (a.option > b.option) ? 1 : ((b.option > a.option) ? -1 : 0))
        .map(cmd => `\t${cmd.option} ${cmd.requiresArgs ? cmd.displayArgs + ' ' : ''}- ${cmd.description}`).join('\n')}`);
    process.exit();
}
if(process.argv.length <= 2) {
    displayHelp('Too few arguments.')
} else {
    let argsObj = {};
    process.argv.forEach((arg, i) => {
        let argument = arg.toLowerCase();
        let command = commands.find(command => (command.option === argument) || (command.aliases.indexOf(argument) !== -1));
        if(command) {
            if(command.requiresArgs) {
                if(process.argv[i+1] ? process.argv[i+1].startsWith('-') : true) {
                    argsObj[command.setVar] = null;  
                } else {
                    argsObj[command.setVar] = process.argv[i+1] || null;
                }
            } else {
                argsObj[command.setVar] = true;
            }
        }
    })

    const effectsPath = './effects/';

    if(argsObj.effects) {
        let effects = fs.readdirSync(effectsPath).map(dir => {
            let firstLine = fs.readFileSync(effectsPath + dir, 'utf8').split('\n')[0];
            let effName = dir.split('.');
            effName.pop();
            effName = effName.join('.');
            if(firstLine.startsWith('// ')) {
                firstLine = firstLine.slice(3);
                return `${effName} - ${firstLine}`;
            } else return `${effName} - move the bytes all arround, no specific effect desired`;
        });
        console.log(effects.join('\n'));
        process.exit();
    }

    global._buf = [];
    global.readed = 0;
    global.chunkI = 0;
    global.prog = 0; // increments every time a byte is modified
    global.MB = 1048576;
    global.random = (lim=12) => Math.floor(Math.random() * lim);
    
    const file = argsObj.file;
    const output = argsObj.output;
    const effectName = argsObj.effect;

    if(!file) return err("Please provide a file to be used with -file.");
    if(!output) return err("Please provide an output file with -output.")
    if(!effectName) return err("Please provide an effect name or use -effects for a list of them.");

    let effect;

    try { 
        effect = require(effectsPath + effectName);
    } catch(error) {
        if(error.code === 'MODULE_NOT_FOUND') {
            err(`Effect at "${effectsPath + effectName}" not found.`);
        } else {
            console.warn(err);
        }
    }

    const videoStat = fs.statSync(file);
    const video = fs.createReadStream(file);
    
    const start = eval(argsObj.start) || 5000;
    const end = eval(argsObj.end) || (videoStat.size - (Math.trunc(videoStat.size / 12)));

    const DownloadingProgress = (recieved, total) => {
        process.stdout.write("\x1B[0G");
        process.stdout.write(`${Math.trunc(recieved/1e+6)}/${Math.trunc(total/1e+6)} megabytes modified (${recieved > start}, ${recieved < end}) `);
    }

    console.log(`Starting (${videoStat.size} offsets ${start}-${end}) with effect ${effect} (effect name: ${effectName})`)

    video.on("data", (chunk) => {
        let prev = 0;
        readed+=chunk.length;
        global.chunkI++;
        if((readed > start) && (readed < end)) {
            for(let byte of chunk.entries()) {
                chunk[byte[0]] = effect(chunk[byte[0]], prev, chunk, byte[0]);
                global.prog++;
                prev = chunk[byte[0]]
            }
        }
        _buf.push(chunk);
        DownloadingProgress(readed, videoStat.size);
    });
    video.on("end", () => {
        let buff = Buffer.concat(_buf)
        console.log(`\nWriting to ${output}...`)
        fs.writeFileSync(output, buff);
        console.log("Done");
    });
    video.on("error", (err) => reject(err));
}