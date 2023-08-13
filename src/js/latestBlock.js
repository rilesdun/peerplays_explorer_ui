// Connect to the WebSocket
var socket = io.connect('http://localhost:5000/api/latest_block');

socket.on('block update', function(data) {
  if (data.block_num !== null && data.block_num !== undefined) {
    document.getElementById('currentBlock').innerText = '+' + data.block_num;
  }
});