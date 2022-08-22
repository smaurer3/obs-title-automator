#!/usr/bin/python3

import PyATEMMax
import websocket
import json
import sys
from typing import Dict, Any
from pprint import pprint

def on_message(obs_ws, message):
    data = json.loads(message)
    if (data['type'] == 'slide_transition'):
        slide_transition(data)

def slide_transition(data):
    if data['name'] == 'Slide in' and data['update-type'] == 'TransitionBegin':
        switcher.setKeyerOnAirEnabled("mixEffect1", "keyer1", True)
    if  data['name'] == 'Slide Out' and data['update-type'] == 'TransitionEnd':
        switcher.setKeyerOnAirEnabled("mixEffect1", "keyer1", False)


switcher = PyATEMMax.ATEMMax()
print("Connecting to switcher")
switcher.connect('192.168.1.234')
switcher.waitForConnection(timeout=2.5)
if switcher.connected:
    print("Switcher Connected")
else:
    print("Switcher not connected")
    sys.exit(2)


def onReceive(params: Dict[Any, Any]) -> None:
    pprint(params)

#switcher.registerEvent(switcher.atem.events.receive, onReceive)

obs_ws = websocket.WebSocketApp("ws://localhost:4444", on_message=on_message)
obs_ws.run_forever()

