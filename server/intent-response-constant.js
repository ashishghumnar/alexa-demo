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

    DIALOG_MESSAGE_RESPONSE: {
        "version": "1.0",
        "response": {
            "shouldEndSession": false,
            "directives": [
                {
                    "type": "Dialog.ElicitSlot",
                    "updatedIntent": {
                        "name": "actionOnEvents",
                        "confirmationStatus": "NONE",
                        "slots": {
                            "AcActions": {
                                "name": "AcActions",
                                "confirmationStatus": "NONE"
                            },
                            "confrenceRoom": {
                                "name": "confrenceRoom",
                                "confirmationStatus": "NONE"
                            }
                        }
                    }
                }
            ]
        }
    },

    delegate:  {
        "version": "1.0",
        "sessionAttributes": {},
        "response": {
            "shouldEndSession": false,
            "directives": [
                {
                    "type": "Dialog.Delegate",
                    "updatedIntent": {
                        "name": "ActionOnEventIntent",
                        "confirmationStatus": "NONE",
                        "slots": {
                            "actionOnDevice": {
                                "name": "actionOnDevice",
                                "confirmationStatus": "NONE"
                            },
                            "confrenceRoom": {
                                "name": "confrenceRoom",
                                "confirmationStatus": "NONE"
                            },
                            "device": {
                                "name": "device",
                                "confirmationStatus": "NONE"
                            }
                        }
                    }
                }
            ]
        }
    },

    DelegateDeviceNotWorking:  {
        "version": "1.0",
        "sessionAttributes": {},
        "response": {
            "shouldEndSession": false,
            "directives": [
                {
                    "type": "Dialog.Delegate",
                    "updatedIntent": {
                        "name": "DeviceNotWorking",
                        "confirmationStatus": "NONE",
                        "slots": {
                            "device": {
                                "name": "device",
                                "confirmationStatus": "NONE"
                            },
                            "floor": {
                                "name": "floor",
                                "confirmationStatus": "NONE"
                            },
                            "floorSide": {
                                "name": "floorSide",
                                "confirmationStatus": "NONE"
                            }
                        }
                    }
                }
            ]
        }
    }
};