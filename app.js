'use strict';

const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    alexaRequestHandler = require('./server/alexa-request-handler');

const bodyParser = require('body-parser');

const server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const server_ip_address = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var socketHolder = null;

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

server.listen(server_port);

alexaRequestHandler(app, server);