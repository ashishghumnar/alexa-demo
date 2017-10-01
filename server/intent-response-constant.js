module.exports = {
    SIMPLE_JSON_RESPONSE: {
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": "Sorry, but no one taught me about this"
            },
            "card": {
                "type": "Simple"
            },
            "shouldEndSession": true
        }
    },

    JSON_RESPONSE_FOR_DEVIECE: {
        dialog_one: {
            "version": "1.0",
            "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Sorry, but no one taught me about this"
                },
                "reprompt": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": "Can I help you with anything else?"
                    }
                },
                "card": {
                    "type": "Simple"
                },
                "shouldEndSession": false
            }
        }
    },

    FACILITIES: {
        events: {
            0: 'LOW TEMPERATURE',
            1: 'HIGH TEMPERATURE',
            2: 'HIGH TEMPERATURE',
            3: 'HIGH CPU',
            4: 'LOW DISK SPACE',
            30: 'ROOM OCCUPIED',
            40: 'ROOM VACATED',
            50: 'HIGH TEMPERATURE',
            70: 'AC ON',
            80: 'AC OFF',
            20: 'VEHICLE LEAVING',
            10: 'VEHICLE COMING',
            90: 'REFILL REQUIRED',
            85: 'AC Blocked suction lines',
            95: 'LEAKAGE DETECTED',
            100: 'Weak HDMI Signal'
        },

        eventSeverity: {
            0: 'LOW',
            1: 'MEDIUM',
            2: 'HIGH',
            3: 'CRITICAL'
        },

        eventStatus: {
            '-1': 'OPEN',
            0: 'CLOSE'
        },

        deviceState: {
            0: 'ON',
            1: 'OFF'
        },

        confereneRoomStates: {
            0: 'OCCUPIED',
            1: 'VACANT'
        },

        deviceStatus: {
            0: 'WORKING',
            1: 'NOT WORKING'
        }
    }
}