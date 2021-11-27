module.exports = [{
    option: '-file',
    aliases: ['-f', '-input', '-i'],
    description: 'File that will be used.',
    displayArgs: '[path]',
    requiresArgs: true,
    setVar: 'file' 
}, {
    option: '-output',
    aliases: ['-o', '-out'],
    description: 'Output file.',
    displayArgs: '[path]',
    requiresArgs: true,
    setVar: 'output' 
}, {
    option: '-effect',
    aliases: ['-fx', '-code', '-e', '-ef'],
    description: 'Effect that will be applied to the file. For a list of effects, use -effects',
    displayArgs: '[effect]',
    requiresArgs: true,
    setVar: 'effect' 
}, {
    option: '-start',
    aliases: ['-s'],
    description: 'Where the effect will start to be applied (in bytes), evaled (meaning you can do stuff like 12*MB to easily express 12 megabytes in bytes). This is very influential to the result, be sure to change it if you\'re not happy with it. Defaults to 5000',
    displayArgs: '[path]',
    requiresArgs: true,
    setVar: 'start' 
}, {
    option: '-end',
    aliases: [],
    description: 'Where the effect will stop being applied (in bytes), evaled (meaning you can do stuff like 12*MB to easily express 12 megabytes in bytes). This is very influential to the result, be sure to change it if you\'re not happy with it. Defaults to the video size minus 1/12 of itself in bytes.',
    displayArgs: '[path]',
    requiresArgs: true,
    setVar: 'end' 
}, {
    option: '-effects',
    aliases: ['-fxs', '-l'],
    description: 'List of all effects in ./effects with a description if they have any.',
    displayArgs: '',
    requiresArgs: false,
    setVar: 'effects' 
}];