'use strict';

const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    socketIO = require('socket.io')(server);

const bodyParser = require('body-parser');


const server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const server_ip_address = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

var sampleRespJSON = {
    "version": "1.0",
    "response": {
        "outputSpeech": {
            "type": "PlainText",
            "text": "Hey, Hi This is Ashish"
        },
        "card": {
            "type": "Simple",
        },
        "reprompt": {
            "outputSpeech": {
                "type": "PlainText",
                "text": "Can I help you with anything else?"
            }
        },
        "shouldEndSession": false
    }
};

app.post('/api.echo', function (req, res) {

    var intend = getIntend(req.body.request);

    if (intend === 'CreateTicketIntend') {
        sampleRespJSON.response.outputSpeech.text = 'Let me create ticket for you';
        //credtre
        res.send(sampleRespJSON);
    } else {
        sampleRespJSON.response.outputSpeech.text = 'Hello There';
        res.send(sampleRespJSON);
    }
});

function getIntend(request) {
    return request.intent.name;
}

server.listen(server_port);

socketIO.on('connection', function (socket) {
    socket.emit('news', {test: 'ashis'});
});