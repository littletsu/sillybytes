# sillybytes

Apply effects to bytes in a file and output them, mainly used to glitch data in videos but can have other uses.

# table of contents

-   [usage](#usage)
    -   [installation](#installation)
        -   [requirements](#requirements)
    -   [examples](#examples)
-   [adding effects](#adding-effects)
    -   [effect descriptions](#effect-descriptions)
-   [cool media made with sillybytes](#cool-media-made-with-sillybytes)

# usage

## installation

### requirements

-   git (https://git-scm.com/)
-   nodejs (https://nodejs.dev/)

clone repo with git

```
git clone https://github.com/littletsu/sillybytes.git
```

go to the project and use `node index` for a list of commands

```
cd sillybytes
node index
```

## examples

Use effect `6` on a file at `eliacore.avi` which size is `192264720` bytes and output on `elia.avi` starting at 45MB and ending at 160MB

```
> node index2 -file output/eliacore.avi -output output/elia.avi -fx 6 -start 45*MB -end 160*MB
```

Expected output:

```
Starting (192264720 offsets 47185920-167772160) with effect (byte, prev, chunk, i) => {
    return byte < 127 ? (chunk[i*10]) || (byte - (prog % 21)) || byte : byte > 55 ? byte == 33 ? chunk[i-10] || 127 : prev + 11 : 0;
} (effect name: 6)
192/192 megabytes modified (true, false)
Writing to output/elia.avi...
Done
```

# adding effects

before adding an effect, its important to know what an effect is, and what it does.<br><br>
an effect is nothing but a **function that will be executed for every byte, with some parameters** such as the **current byte, the previous byte, the chunk of bytes that is currently being modified, and the index of the byte in that chunk**. the effect's job is to return a byte which can based or influenced by those parameters. for more indepth on how an effect works, look at the `./effects/` folder and open the contents of an effect.
<br><br>
to add an effect, add a javascript file on `./effects/` with the effect name, if for example your effect name was `cooleffect` you would add a file on `./effects/` with the name `cooleffect.js`.<br>

in this file you will export a function like this:<br>

```js
module.exports = (byte, prev, chunk, i) => {
	return byte - 1;
};
```

this function is a very simple effect that will return the byte that is passed onto it minus one, but it will help us to explain all the parameters that are passed onto the effect's function.<br><br>
`byte` - the byte that is currently being modified<br>
`prev` - the previous byte that was passed through this function. if this is the first time the function is being executed, this will be `0`.<br>
`chunk` - the chunk of bytes that is currently being read. see `fs.createReadStream` for more indepth on how files are being read.<br>
`i` - the position/index of `byte` in the current chunk.<br><br>
along with these parameters, there are also global variables and functions that can be used:

```js
global._buf; // array of all the chunks that have been read and modified.
global.readed; // how many bytes of the file have been read
global.chunkI; // the position/index of the current chunk in "global._buf"
global.prog; // increments every time a byte is modified, starts at 0
global.MB = 1048576; // constant of how many bytes are in a megabyte. mainly used for "-start" and "-end" commands.
global.random(lim); // function that returns a random integer between 0 and "lim" parameter. lim defaults to 12.
```

## effect descriptions

you may have noticed that every effect has a description in the `-effects` command. this is achieved by just adding a comment in the first line of your effect like this:

```js
// this is a very cool effect that returns the byte-1
module.exports = (byte, prev, chunk, i) => {
	return byte - 1;
};
```

and just like that your effect will now have a description in the `-effects` option! be sure to give your effect a meaningful description if youre gonna give it one, which atleast tells what is being returned.
<br><br>
(if an effect doesn't have a description, it will just default to `move the bytes all arround, no specific effect desired`)
<br><br>

> effects dont have to be too complicated, neither do you have to know what you're even doing. be as creative as you want with them! (as long as they work, of course)

# cool media made with sillybytes

[imgur gallery with screenshots from videos manipulated while experimenting with effects](https://imgur.com/a/lUc47iY)
<br><br>
(if you have more cool stuff, preferably images, that youve made with this, send it to me for it to be added here!)
