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
    const intent = req.body.request ? getIntend(req.body.request) : '',
        isLaunchRequest = req.body.request.type === 'LaunchRequest',
        isSessionEndedRequest = req.body.request.type === 'SessionEndedRequest';


    if (isLaunchRequest) {
        var RESPONSE_LAUNCH_REQ = JSON.parse(JSON.stringify(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE));
        RESPONSE_LAUNCH_REQ.response.outputSpeech.text = 'Welcome To SmartFacilities, How can help you ?';
        RESPONSE_LAUNCH_REQ.shouldEndSession = false;

        res.send(RESPONSE_LAUNCH_REQ);
    } else if (isSessionEndedRequest) {
        var RESPONSE_LAUNCH_REQ = JSON.parse(JSON.stringify(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE));
        RESPONSE_LAUNCH_REQ.response.outputSpeech.text = 'Thank You..!';
        RESPONSE_LAUNCH_REQ.shouldEndSession = true;

        res.send(RESPONSE_LAUNCH_REQ);
    }

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
    } else if (intent === 'ActionOnEventIntent') {
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
            RESPONSE_FINAL.response.outputSpeech.text = "I will " + intentSolts.actionOnDevice.value + " " + intentSolts.device.value + " for you from" + intentSolts.confrenceRoom.value + ".";
            res.send(RESPONSE_FINAL);
        } else {
            var RESPONSE_DELEGATE_DEVICE = JSON.parse(JSON.stringify(INTENT_RESPONSE.delegate));
            if (intentSolts.actionOnDevice.value) {
                RESPONSE_DELEGATE_DEVICE.response.directives[0].updatedIntent.slots.actionOnDevice.value = intentSolts.actionOnDevice.value;
                RESPONSE_DELEGATE_DEVICE.response.directives[0].updatedIntent.slots.actionOnDevice.confirmationStatus = 'CONFIRMED';
            }

            if (intentSolts.device.value) {
                RESPONSE_DELEGATE_DEVICE.response.directives[0].updatedIntent.slots.device.value = intentSolts.device.value;
                RESPONSE_DELEGATE_DEVICE.response.directives[0].updatedIntent.slots.device.confirmationStatus = 'CONFIRMED';
            }

            if (intentSolts.confrenceRoom.value) {
                RESPONSE_DELEGATE_DEVICE.response.directives[0].updatedIntent.slots.confrenceRoom.value = intentSolts.confrenceRoom.value;
                RESPONSE_DELEGATE_DEVICE.response.directives[0].updatedIntent.slots.confrenceRoom.confirmationStatus = 'CONFIRMED';

                RESPONSE_DELEGATE_DEVICE.response.directives[0].type = 'Dialog.ConfirmIntent';
                RESPONSE_DELEGATE_DEVICE.response.outputSpeech = {
                    "type": "PlainText"
                };

                RESPONSE_DELEGATE_DEVICE.response.outputSpeech.text = "You want to " + intentSolts.actionOnDevice.value + " " + intentSolts.device.value + " " + intentSolts.confrenceRoom.value + " ?";
            }

            try {
                res.send(RESPONSE_DELEGATE_DEVICE);
            } catch (err) {
                console.log(err);
            }
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