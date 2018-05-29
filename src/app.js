const fs = require("fs");
const readLine = require('readline');

const logger = require('./logger');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

fs.readFile('log.txt', 'utf-8', onFileLoad);

rl.on('line', onConsoleInput)
    .on('close', onClose);

function onFileLoad(err, file) {
    logger.ready(err, file);
    logger.print();
    rl.prompt();
}

function onConsoleInput(input) {
    if (input === "exit") {
        rl.close();
        return;
    }

    const dt = new Date();
    const timeStamp = dt.getFullYear() + '/'
        + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '/' + ('0' + dt.getDate()).slice(-2)
        + ' ' + ('0' + dt.getHours()).slice(-2)
        + ':' + ('0' + dt.getMinutes()).slice(-2)
        + ':' + ('0' + dt.getSeconds()).slice(-2);
    const msg = `[${timeStamp}] ${input}`;

    console.log(msg);
    logger.append(msg);
    rl.prompt();
}

function onClose(err) {
    if (err) {
        console.log(err);
    }

    console.log('Saving...');
    logger.waitForFile();
    logger.save();
}