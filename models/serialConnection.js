
var port;
let obj;
async function initSerialConnection() {
    var SerialPort = require('serialport');
    port = new SerialPort('COM12', {
        baudRate: 115200
    }, function (err) {
        if (err) {
            return console.log('Error: ', err.message);
        }
    });
    var buffer = '';
    port.on('data', async function (chunk) {

        buffer += chunk;
        if (buffer.length > 1000)
            buffer = '';
        var regex = /({.+})/
        var objects = buffer.match(regex);
        if (objects && objects.length) {
            var object = objects.pop();
            buffer = '';
            try {
                obj = JSON.parse(object);
                handleObj(obj);
            } catch (e) { console.error(e); console.log(object) }
        }
    });
}

function handleObj(obj) {
    const ReportHandler = require('../handlers/reportHandler');
    if (obj.status == 200) {
        if (obj.type == 3) {
            ReportHandler.printResponse(obj);
        }
        else {
            console.log("\n\n\n||||RETORNO||||\n");
            console.log(obj.msg);
        }
    } else if (obj.status == 400) {
        console.log("\n\n\n||||RETORNO ERRO||||\n");
        console.log(obj.msg);
    }
    return;
}

function write(text) {
    console.log("Escrevendo: " + text)
    port.write(text);
}
module.exports = {
    initSerialConnection,
    write
}