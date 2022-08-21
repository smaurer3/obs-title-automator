
/************* New websockets*****************/
var $D = function(id) { return document.getElementById(id); },
ws = null, msgs = $D('messages');
title = null

let title_handler = function(data){
	switch (data.type) {
		case 'state':
		console.log(data["value"]);
			$("#title").html(data["value"]);
			break;
		case 'users':

			break; 
		default:
			console.error(
				"unsupported event", data);
	}
}

let obs_handler = function(data) {
	if (
		data.name == 'Slide Out' && 
		data['update-type'] == 'TransitionEnd'
		){
			current_id++
			data = $("#"+ current_id).html();
			to_vmix(data, $("#"+ current_id))
			window.scrollBy(0, $("#"+ current_id).height())	
	}
}

$(document).ready(function(){
	
		connect('ws://localhost:6780/', title_handler);
		connect('ws://localhost:4444/', obs_handler);
		
	});

function connect(uri, handler) {
	title = new MyWebsocket(uri, handler);
}

function update(lyrics) {
	
	title.send(JSON.stringify({action: 'update', value: lyrics}));
}

function msg(str) {
	console.log ("Received: %c" + str, 'color :magenta');
	
}




class MyWebsocket {
	constructor(uri, handler) {
		$('body').css("background-color", "red")
		this.connecting = true;
		this.connected = false;
		console.log("connecting to: " + uri);
		this.ws = new WebSocket(uri);	
		this.handler = handler;
			
		this.ws.addEventListener('open', function () {
			console.log("Connected");
			this.connected = true;
			this.connecting = false;
			
			$('body').css("background-color", "rgba(0,0,0,0)")
		});
		this.ws.addEventListener('message', function (event) {  // Received Data
			this.data = JSON.parse(event.data);
			handler(this.data);
			
		});
		this.ws.addEventListener('close', function () {
			
			this.connected = false;
			$('body').css("background-color", "red")
			if (this.ws) { this.ws.close(); }
			this.ws = null;
			connect(uri, handler);
			console.log("Disconnected");
		});

		
	}

	send(data) {
		console.log(data)
		this.ws.send(data);
		
	};
}
