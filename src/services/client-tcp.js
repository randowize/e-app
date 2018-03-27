"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
let client = new net.Socket();
let PORT = process.env.TCP_PORT || 9000;
let HOST = process.env.HOST_IP_LOCAL || process.env.HOST_IP || process.env.HOST_NAME || '127.0.0.1';
function connect() {
    return new Promise((res, rej) => {
        client.connect(PORT, HOST, function (err) {
            if (err)
                return rej(err);
            return res('connection established');
        });
    });
}
exports.connect = connect;
client.on('data', function (data) {
    console.log('Received: ' + data);
});
client.on('close', function () {
    console.log('Connection closed');
});
function sendMatrix(data) {
    return client.destroyed
        ? false
        : client.write(data);
}
exports.sendMatrix = sendMatrix;
function sendValue(data) {
    return client.destroyed
        ? false
        : client.write('put:' + data);
}
exports.sendValue = sendValue;
function close() {
    if (!client.destroyed) {
        client.write('close');
    }
}
exports.close = close;
function reconnect() {
    return client.destroyed ? client
        .connect(PORT, HOST, function () {
        console.log('Reconnected');
    })
        :
            null;
}
exports.reconnect = reconnect;
