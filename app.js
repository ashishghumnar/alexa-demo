'use strict';

const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    socketIO = require('socket.io')(server);

const server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/client'));

console.log("%s %s", server_port, server_ip_address);

server.listen(server_port, server_ip_address, function () {
    console.log("Listening on " + server_ip_address + ", port " + server_port)
});

socketIO.on('connection', function (socket) {
    socket.emit('news', {test: 'ashis'});
});