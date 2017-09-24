'use strict';

const express = require('express'),
    socketIO = require('socket.io'),
    app = express();


app.use(express.static(__dirname + '/client'));

app.listen(9009, function () {
    console.log('started on ..%s', 9009);
});

socketIO.on('connect', function () {

});