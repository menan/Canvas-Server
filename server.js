(function() {
  var io;
  var canvasData;
  io = require('socket.io').listen(4000);

  io.sockets.on('connection', function(socket) {

    socket.emit('context', { ctx: canvasData});
    socket.on('drawClick', function(data) {
      canvasData = data.ctx;
      socket.broadcast.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type,
        color: data.color
      });
    });
  });
}).call(this);
