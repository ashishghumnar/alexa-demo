/**
 * Created by aghumnar on 10/1/2017.
 */
INTENT_RESPONSE = require('./../intent-response-constant');

var socketHolder = null;

function getIntend(request) {
    return request.intent.name || '';
}

function setSocket(socket) {
    socketHolder = socket;
}

function intentRequestHandler(req, res) {
    const intent = req.body.request ? getIntend(req.body.request) : '';

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

            try {
                res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
            } catch (err) {
                console.log(err);
            }
        });
    } else if (intent === 'TurnACOFFIntend') {
        socketHolder.emit('turnOffAc', {});

        socketHolder.on('turnOffAc', function () {
            console.log('in on turnOffAc');
            INTENT_RESPONSE.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = "Hey, I have turn off AC for you";
            try {
                res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
            } catch (err) {
                console.log(err);
            }
        });
    } else if (intent === 'DeviceNotWorking') {
        res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
    } else if (intent === 'ListCriticalEvents') {

        socketHolder.emit('getCriticalEvents', {});

        socketHolder.on('criticalEvents', function (eventList) {
            INTENT_RESPONSE.JSON_RESPONSE_FOR_DEVIECE.response.outputSpeech.text = eventList;
            INTENT_RESPONSE.JSON_RESPONSE_FOR_DEVIECE.dialog_one.response.reprompt.outputSpeech.text = 'Do you want me to take some actions?';
            try {
                res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
            } catch (err) {
                console.log(err);
            }
        });
    } else {
        res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
    }
}

module.exports = {
    intentRequestHandler: intentRequestHandler,
    setSocket: setSocket
};