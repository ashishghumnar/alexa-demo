'use strict';

const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    socketIO = require('socket.io')(server);

const server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const server_ip_address = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/client'));
app.get('/itemCheck', function (req, res) {
    res.send('Hey i am started!');
});
console.log("%s %s", server_port, server_ip_address);

server.listen(server_port, server_ip_address);
console.log('Server running on http://%s:%s', server_ip_address, server_port);

socketIO.on('connection', function (socket) {
    socket.emit('news', {test: 'ashis'});
});