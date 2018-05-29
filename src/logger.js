const fs = require("fs");

let logData;
let loaded = false;

let unsavedLogs = [];

function ready(err, fileData) {
    if (err) {
        console.log(err);
        process.exit(0);
    } else {
        logData = fileData;
        loaded = true;
    }
}

function printLog() {
    console.log(logData);
}

function appendLog(data) {
    unsavedLogs[unsavedLogs.length] = data;
}

function saveLog() {
    let data = '';
    for (let log of unsavedLogs) {
        data += log + '\n';
    }
    fs.appendFile('log.txt', data, exit);
}

function waitForFile() {
    if (loaded) return;
    setTimeout(waitForFile, 100);
}

function exit(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Save completed.');
    }

    process.exit(0);
}

module.exports.ready = ready;
module.exports.print = printLog;
module.exports.append = appendLog;
module.exports.save = saveLog;
module.exports.waitForFile = waitForFile;
