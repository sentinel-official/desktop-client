const net = require('net');

const isPortFree = (port, hostname, cb) => {
    const server = net.createServer((socket) => {
        socket.end('echo');
    });

    server.listen(port, hostname);
    server.on('error', (e) => {
        cb(e);
    });
    server.on('listening', (e) => {
        server.close();
        cb(null);
    });
};

const getFreePort = (cb) => {
    const server = net.createServer((socket) => {
        socket.end('echo');
    });

    server.listen(0, () => {
        cb(null, server.address().port);
    });
};

module.exports = {
    isPortFree,
    getFreePort,
};
