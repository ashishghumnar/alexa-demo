var alex_json = {
    "intents": [
        {
            "name": "AcknowledgeIntent",
            "samples": [
                "Thank You",
                "Thanks",
                "Cool"
            ],
            "slots": []
        },
        {
            "name": "ActionOnEventIntent",
            "samples": [
                "{actionOnDevice} {device} from {confrenceRoom}",
                "{actionOnDevice}  {device}",
                "Could you {actionOnDevice} ",
                "Please {actionOnDevice}"
            ],
            "slots": [
                {
                    "name": "actionOnDevice",
                    "type": "actionOnDevice",
                    "samples": []
                },
                {
                    "name": "device",
                    "type": "device",
                    "samples": [
                        "{device}"
                    ]
                },
                {
                    "name": "confrenceRoom",
                    "type": "confrenceRoom",
                    "samples": [
                        "{confrenceRoom}"
                    ]
                }
            ]
        },
        {
            "name": "AMAZON.CancelIntent",
            "samples": []
        },
        {
            "name": "AMAZON.HelpIntent",
            "samples": []
        },
        {
            "name": "AMAZON.StopIntent",
            "samples": []
        },
        {
            "name": "DeviceNotWorking",
            "samples": [
                "{device}  Not working on {floor} {floorSide}",
                "{device} not working",
                "{device} not working on {floor}"
            ],
            "slots": [
                {
                    "name": "device",
                    "type": "device",
                    "samples": []
                },
                {
                    "name": "floor",
                    "type": "floors",
                    "samples": [
                        "{floor}",
                        "{floor} {floorSide}"
                    ]
                },
                {
                    "name": "floorSide",
                    "type": "floorSides",
                    "samples": [
                        "{floorSide}"
                    ]
                }
            ]
        },
        {
            "name": "ListEvents",
            "samples": [
                "List {eventType} events",
                "is there any {eventType} events"
            ],
            "slots": [
                {
                    "name": "eventType",
                    "type": "events",
                    "samples": []
                }
            ]
        }
    ],
    "types": [
        {
            "name": "actionOnDevice",
            "values": [
                {
                    "id": "turnOn",
                    "name": {
                        "value": "Turn On",
                        "synonyms": [
                            "Turn On"
                        ]
                    }
                },
                {
                    "id": "turnOff",
                    "name": {
                        "value": "Turn Off",
                        "synonyms": [
                            "Turn Off"
                        ]
                    }
                }
            ]
        },
        {
            "name": "confrenceRoom",
            "values": [
                {
                    "id": "cf_room_02",
                    "name": {
                        "value": "Solaria",
                        "synonyms": [
                            "Solaria"
                        ]
                    }
                },
                {
                    "id": "cf_room_01",
                    "name": {
                        "value": "Eiffel Tower",
                        "synonyms": [
                            "Eiffel"
                        ]
                    }
                }
            ]
        },
        {
            "name": "device",
            "values": [
                {
                    "id": "device_pr_03",
                    "name": {
                        "value": "AC",
                        "synonyms": [
                            "AC",
                            "Air Condition"
                        ]
                    }
                },
                {
                    "id": "device_pr_02",
                    "name": {
                        "value": "TV",
                        "synonyms": [
                            "TV",
                            "Television"
                        ]
                    }
                },
                {
                    "id": "device_pr_01",
                    "name": {
                        "value": "Projector",
                        "synonyms": [
                            "Projector"
                        ]
                    }
                },
                {
                    "id": "device_pr_04",
                    "name": {
                        "value": "Coffee Machine",
                        "synonyms": [
                            "Coffee Machine",
                            "Vending Machine"
                        ]
                    }
                }
            ]
        },
        {
            "name": "events",
            "values": [
                {
                    "id": "2",
                    "name": {
                        "value": "Critical",
                        "synonyms": [
                            "Critical"
                        ]
                    }
                },
                {
                    "id": "1",
                    "name": {
                        "value": "Medium",
                        "synonyms": [
                            "Mediam"
                        ]
                    }
                },
                {
                    "id": "0",
                    "name": {
                        "value": "Low",
                        "synonyms": [
                            "Low"
                        ]
                    }
                }
            ]
        },
        {
            "name": "floors",
            "values": [
                {
                    "id": "floor_7",
                    "name": {
                        "value": "7th floor",
                        "synonyms": [
                            "Seventh Floor",
                            "7th floor"
                        ]
                    }
                },
                {
                    "id": "floor_9",
                    "name": {
                        "value": "9th Floor",
                        "synonyms": [
                            "Ninth Floor",
                            "9th floor"
                        ]
                    }
                }
            ]
        },
        {
            "name": "floorSides",
            "values": [
                {
                    "id": "floor_side_north",
                    "name": {
                        "value": "North",
                        "synonyms": [
                            "North"
                        ]
                    }
                },
                {
                    "id": "floor_side_east",
                    "name": {
                        "value": "East",
                        "synonyms": [
                            "East"
                        ]
                    }
                },
                {
                    "id": "floor_side_west",
                    "name": {
                        "value": "West",
                        "synonyms": [
                            "West"
                        ]
                    }
                },
                {
                    "id": "floor_side_south",
                    "name": {
                        "value": "South",
                        "synonyms": [
                            "South"
                        ]
                    }
                }
            ]
        }
    ],
    "prompts": [
        {
            "id": "Elicit.Intent-ActionOnEventIntent.IntentSlot-device",
            "promptVersion": "1.0",
            "definitionVersion": "1.0",
            "variations": [
                {
                    "type": "PlainText",
                    "value": "what you want to turn On?"
                }
            ]
        },
        {
            "id": "Elicit.Intent-ActionOnEventIntent.IntentSlot-confrenceRoom",
            "promptVersion": "1.0",
            "definitionVersion": "1.0",
            "variations": [
                {
                    "type": "PlainText",
                    "value": "From which conference Room?"
                }
            ]
        },
        {
            "id": "Confirm.Intent-DeviceNotWorking",
            "promptVersion": "1.0",
            "definitionVersion": "1.0",
            "variations": [
                {
                    "type": "PlainText",
                    "value": "Should I create ticket for {device} not working on {floor}  {floorSide}"
                }
            ]
        },
        {
            "id": "Elicit.Intent-DeviceNotWorking.IntentSlot-floor",
            "promptVersion": "1.0",
            "definitionVersion": "1.0",
            "variations": [
                {
                    "type": "PlainText",
                    "value": "On which floor ?"
                }
            ]
        },
        {
            "id": "Elicit.Intent-DeviceNotWorking.IntentSlot-floorSide",
            "promptVersion": "1.0",
            "definitionVersion": "1.0",
            "variations": [
                {
                    "type": "PlainText",
                    "value": "On which side ?"
                }
            ]
        }
    ],
    "dialog": {
        "version": "1.0",
        "intents": [
            {
                "name": "ActionOnEventIntent",
                "confirmationRequired": false,
                "prompts": {},
                "slots": [
                    {
                        "name": "actionOnDevice",
                        "type": "actionOnDevice",
                        "elicitationRequired": false,
                        "confirmationRequired": false,
                        "prompts": {}
                    },
                    {
                        "name": "device",
                        "type": "device",
                        "elicitationRequired": true,
                        "confirmationRequired": false,
                        "prompts": {
                            "elicit": "Elicit.Intent-ActionOnEventIntent.IntentSlot-device"
                        }
                    },
                    {
                        "name": "confrenceRoom",
                        "type": "confrenceRoom",
                        "elicitationRequired": true,
                        "confirmationRequired": false,
                        "prompts": {
                            "elicit": "Elicit.Intent-ActionOnEventIntent.IntentSlot-confrenceRoom"
                        }
                    }
                ]
            },
            {
                "name": "DeviceNotWorking",
                "confirmationRequired": true,
                "prompts": {
                    "confirm": "Confirm.Intent-DeviceNotWorking"
                },
                "slots": [
                    {
                        "name": "device",
                        "type": "device",
                        "elicitationRequired": false,
                        "confirmationRequired": false,
                        "prompts": {}
                    },
                    {
                        "name": "floor",
                        "type": "floors",
                        "elicitationRequired": true,
                        "confirmationRequired": false,
                        "prompts": {
                            "elicit": "Elicit.Intent-DeviceNotWorking.IntentSlot-floor"
                        }
                    },
                    {
                        "name": "floorSide",
                        "type": "floorSides",
                        "elicitationRequired": true,
                        "confirmationRequired": false,
                        "prompts": {
                            "elicit": "Elicit.Intent-DeviceNotWorking.IntentSlot-floorSide"
                        }
                    }
                ]
            }
        ]
    }
}