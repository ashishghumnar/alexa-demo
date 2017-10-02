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
    }
};