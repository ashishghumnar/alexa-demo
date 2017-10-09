/**
 * Created by aghumnar on 10/1/2017.
 */
INTENT_RESPONSE = require('./../intent-response-constant');

var socketHolder = null;

function getIntend(request) {
    return request && request.intent && request.intent.name ? request.intent.name : '';
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
            try {
                var slots = req.body.request.intent.slots || {};
                var confRoom = slots.confRoom.value ? ' from ' + slots.confRoom.value : '';

                INTENT_RESPONSE.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = "I have Turn On Ac For You" + confRoom;

                res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
            } catch (err) {
                console.log(err);
            }
        });
    } else if (intent === 'TurnACOFFIntend') {
        socketHolder.emit('turnOffAc', {});

        socketHolder.on('turnOffAc', function () {
            var slots = req.body.request.intent.slots || {};
            var confRoom = slots.confRoom.value ? 'from ' + slots.confRoom.value : '';

            INTENT_RESPONSE.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = "Hey, I have turn off AC for you" + confRoom;
            try {
                res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
            } catch (err) {
                console.log(err);
            }
        });
    } else if (intent === 'actionOnEvents') {
        if (req.body.request.dialogState === 'IN_PROGRESS') {
            var intentSolts = req.body.request.intent.slots;

            if (req.body.request.intent.confirmationStatus === 'CONFIRMED') {
                socketHolder.emit('turnOnAc', {});

                socketHolder.on('turnOnAc', function () {
                    try {
                        console.log('turn on');
                    } catch (err) {
                        console.log(err);
                    }
                });

                var RESPONSE_FINAL = JSON.parse(JSON.stringify(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE));
                RESPONSE_FINAL.response.outputSpeech.text = "I will " + intentSolts.AcActions.value + " for you " + intentSolts.confrenceRoom.value + "." ;
                res.send(RESPONSE_FINAL);
            } else {
                if (intentSolts.confrenceRoom.value) {
                    var RESPONSE = JSON.parse(JSON.stringify(INTENT_RESPONSE.test));

                    RESPONSE.response.directives[0].type = 'Dialog.ConfirmIntent';
                    RESPONSE.response.outputSpeech.text = "You want to " + intentSolts.AcActions.value + " " + intentSolts.confrenceRoom.value + " ?";

                    RESPONSE.response.directives[0].updatedIntent.slots.confrenceRoom.confirmationStatus = 'CONFIRMED';
                    RESPONSE.response.directives[0].updatedIntent.slots.confrenceRoom.value = intentSolts.confrenceRoom.value;
                    RESPONSE.response.directives[0].updatedIntent.slots.AcActions.value = intentSolts.AcActions.value;

                    res.send(RESPONSE);
                } else if (intentSolts.AcActions.value) {
                    var RESPONSE_CONF_ROOM = JSON.parse(JSON.stringify(INTENT_RESPONSE.test));

                    RESPONSE_CONF_ROOM.response.directives[0].slotToElicit = 'confrenceRoom';
                    RESPONSE_CONF_ROOM.response.outputSpeech.text = "from which conference Room?";

                    RESPONSE_CONF_ROOM.response.directives[0].updatedIntent.slots.AcActions.value = intentSolts.AcActions.value;
                    RESPONSE_CONF_ROOM.response.directives[0].updatedIntent.slots.AcActions.confirmationStatus = 'CONFIRMED';
                    res.send(RESPONSE_CONF_ROOM);
                }
            }
        } else {
            res.send(INTENT_RESPONSE.test);
        }
    } else if (intent === 'ListEvents') {
        socketHolder.emit('getCriticalEvents', {});

        socketHolder.on('criticalEvents', function (eventList) {
            INTENT_RESPONSE.JSON_RESPONSE_FOR_DEVIECE.dialog_one.response.outputSpeech.text = eventList;
            INTENT_RESPONSE.JSON_RESPONSE_FOR_DEVIECE.dialog_one.response.reprompt.outputSpeech.text = 'Do you want me to take some actions?';

            try {
                res.send(INTENT_RESPONSE.JSON_RESPONSE_FOR_DEVIECE.dialog_one);
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