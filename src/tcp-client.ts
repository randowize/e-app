import * as net from 'net';

let client = new net.Socket();
let PORT = process.env.TCP_PORT || 9000;
let HOST = process.env.HOST_IP || process.env.HOST_NAME || '127.0.0.1';

export function connect() {
 return new Promise((res, rej) => {
    client.connect(PORT, HOST, function (err) {
     if (err) return rej(err);
     return res('connection established');
  });
 });

}
client.on('data', function (data) {
    console.log('Received: ' + data);
    // client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Connection closed');
});

export function sendMatrix(data: any) {
    return client.destroyed
        ? false
        : client.write(data);

}

export function sendValue(data: any) {
    return client.destroyed
        ? false
        : client.write('put:' + data);

}
export function close() {
  if (!client.destroyed) {
       client.write('close');
  }
}

export function reconnect() {
   return client.destroyed ? client
        .connect(PORT, HOST, function () {
            console.log('Reconnected');
        })
        :
        null;
}
