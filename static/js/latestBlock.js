var socket = io.connect("http://localhost:5000/api/latest_block");

socket.on('connect', function() {
  console.log('Connected to the server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from the server');
  // You can add logic here to update the UI to indicate that the connection has been lost
});

socket.on('reconnect', function(attemptNumber) {
  console.log('Reconnected to the server after ' + attemptNumber + ' attempts');
  // You can add logic here to update the UI to indicate that the connection has been re-established
});

socket.on("block update", function (data) {
  if (data.block_num !== null && data.block_num !== undefined) {
    document.getElementById("currentBlock").innerText = +data.block_num;
  }
});
