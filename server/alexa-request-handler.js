/**
 * Created by aghumnar on 9/28/2017.
 */
const socket_io = require('socket.io'),
    INTENT_RESPONSE = require('./intent-response-constant');

var socketHolder = null;

function alexaRequestHandler(app, server) {
    socket_io(server)
        .on('connection', function (socket) {
            socketHolder = socket;
        });

    app.post('/api.echo', function (req, res) {
        const intent = getIntend(req.body.request);

        if (intent === 'CreateTicketIntend') {
            INTENT_RESPONSE.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = 'Let me create ticket for you';

            socketHolder.emit('createTicket', {data: ''});

            socketHolder.on('ticketCreated', function () {
                res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
            });
        } else if (intent === 'TurnACONIntend') {
            socketHolder.emit('turnOnAc', {});

            socketHolder.on('turnOnAc', function () {
                INTENT_RESPONSE.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = "I have Turn On Ac For You";
                console.log('in on turnOffAc');

                res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
            });
        } else if (intent === 'TurnACOFFIntend') {
            socketHolder.emit('turnOffAc', {});

            socketHolder.on('turnOffAc', function () {
                console.log('in on turnOffAc');
                INTENT_RESPONSE.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = "Hey, I have turn off AC for you";

                res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
            });
        } else {
            INTENT_RESPONSE.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = 'Thank You';
            res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
        }
    });
}

function getIntend(request) {
    return request.intent.name || '';
}

module.exports = alexaRequestHandler;