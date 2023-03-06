var socket = new WebSocket('ws://' + window.location.host + '/ws/chat/' + roomName + '/');
var messageInput = document.getElementById('message-input');
var messageList = document.getElementById('message-list');

socket.onmessage = function(event) {
    var data = JSON.parse(event.data);
    var message = data['message'];
    var user = data['user'];
    var timestamp = data['timestamp'];

    var messageElement = document.createElement('p');
    messageElement.innerText