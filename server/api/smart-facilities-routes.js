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

        RESPONSE_LAUNCH_REQ.response.outputSpeech.text = 'Welcome To Smart Office, How can I help you ?';

        RESPONSE_LAUNCH_REQ.response.reprompt = {
            "outputSpeech": {
                "type": "PlainText",
                "text": "Can I help you with anything else?"
            }
        };

        RESPONSE_LAUNCH_REQ.response.shouldEndSession = false;

        try {
            res.send(RESPONSE_LAUNCH_REQ);
        } catch (err) {

        }
    } else if (isSessionEndedRequest) {
        var RESPONSE_REQ_END = JSON.parse(JSON.stringify(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE));

        RESPONSE_REQ_END.response.outputSpeech.text = 'Thank You..!';
        RESPONSE_REQ_END.response.shouldEndSession = true;

        try {
            res.send(RESPONSE_REQ_END);
        } catch (err) {

        }
    }

    if (intent === 'DeviceNotWorking') {
        var DEVICE_NOT_WORKING_RESP = JSON.parse(JSON.stringify(INTENT_RESPONSE.DelegateDeviceNotWorking)),
            deviceNotWorkingIntentSlots = req.body.request.intent.slots;

        if (req.body.request.intent.confirmationStatus === 'CONFIRMED') {
            var DeviceNotWorking_FINAL = JSON.parse(JSON.stringify(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE));

            DeviceNotWorking_FINAL.response.reprompt = {
                outputSpeech: {
                    "type": "PlainText",
                    "text": "Can I help you with anything else?"
                }
            };

            DeviceNotWorking_FINAL.response.shouldEndSession = false;

            var incidentTitle = deviceNotWorkingIntentSlots.device.value + " not working on " + deviceNotWorkingIntentSlots.floor.value + " " +
                deviceNotWorkingIntentSlots.floorSide.value;

            DeviceNotWorking_FINAL.response.outputSpeech.text = "I have created ticket for " + incidentTitle;

            try {
                res.send(DeviceNotWorking_FINAL);
            } catch (err) {
                console.log(err);
            }
        }

        if (deviceNotWorkingIntentSlots.device.value) {
            DEVICE_NOT_WORKING_RESP.response.directives[0].updatedIntent.slots.device.value = deviceNotWorkingIntentSlots.device.value;
            DEVICE_NOT_WORKING_RESP.response.directives[0].updatedIntent.slots.device.confirmationStatus = 'CONFIRMED';
        }

        if (deviceNotWorkingIntentSlots.floor.value) {
            DEVICE_NOT_WORKING_RESP.response.directives[0].updatedIntent.slots.floor.value = deviceNotWorkingIntentSlots.floor.value;
            DEVICE_NOT_WORKING_RESP.response.directives[0].updatedIntent.slots.floor.confirmationStatus = 'CONFIRMED';
        }

        if (deviceNotWorkingIntentSlots.floorSide.value) {
            DEVICE_NOT_WORKING_RESP.response.directives[0].updatedIntent.slots.floorSide.value = deviceNotWorkingIntentSlots.floorSide.value;
            DEVICE_NOT_WORKING_RESP.response.directives[0].updatedIntent.slots.floorSide.confirmationStatus = 'CONFIRMED';
        }

        socketHolder.emit('createTicket', {
            data: {
                ticketTitle: incidentTitle
            }
        });

        socketHolder.on('ticketCreated', function () {
            console.log('created ticket');
        });

        try {
            res.send(DEVICE_NOT_WORKING_RESP);
        } catch (err) {
            console.log(err);
        }
    } else if (intent === 'ActionOnEventIntent') {
        var intentSolts = req.body.request.intent.slots;

        if (req.body.request.intent.confirmationStatus === 'CONFIRMED') {
            var actionOnEvent = {
                action: ''
            };

            if (/off/.test(intentSolts.actionOnDevice.value)) {
                actionOnEvent.action = 'off';

                socketHolder.emit('turnOffAc', {});
                socketHolder.on('turnOffAc', function () {
                    console.log('turn off ac');
                });
            } else if (/on/.test(intentSolts.actionOnDevice.value)) {
                actionOnEvent.action = 'on';

                socketHolder.emit('turnOnAc', {});
                socketHolder.on('turnOnAc', function () {
                    console.log('turn on ac');
                });
            }

            actionOnEvent.device = intentSolts.device.value;
            actionOnEvent.deviceLocation = intentSolts.confrenceRoom.value;

            console.log('%s %s', intentSolts.device.value, intentSolts.confrenceRoom.value);

            var RESPONSE_FINAL = JSON.parse(JSON.stringify(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE));
            RESPONSE_FINAL.response.outputSpeech.text = "I will " +
                intentSolts.actionOnDevice.value + " " + intentSolts.device.value + " for you from" +
                intentSolts.confrenceRoom.value + ".";

            RESPONSE_FINAL.response.reprompt = {
                outputSpeech: {
                    "type": "PlainText",
                    "text": "Can I help you with anything else?"
                }
            };

            RESPONSE_FINAL.response.shouldEndSession = false;

            try {
                res.send(RESPONSE_FINAL);
            } catch (err) {
                console.log(err);
            }
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
    } else if (intent === 'AcknowledgeIntent') {
        var RESPONSE_AcknowledgeIntent = JSON.parse(JSON.stringify(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE));

        RESPONSE_AcknowledgeIntent.response.outputSpeech.text = 'You are Welcome..!';
        RESPONSE_AcknowledgeIntent.shouldEndSession = true;

        try {
            res.send(RESPONSE_AcknowledgeIntent);
        } catch (err) {
        }
    } else {
        try {
            res.send(INTENT_RESPONSE.SIMPLE_JSON_RESPONSE);
        } catch (err) {

        }
    }
}

module.exports = {
    intentRequestHandler: intentRequestHandler,
    setSocket: setSocket
};