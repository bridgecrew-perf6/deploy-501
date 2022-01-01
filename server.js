const express = require('express');
const morgan = require('morgan');
//const cors = require("cors"); //DEBUG
const bodyParser = require('body-parser')
const app = express();
const ws = require('ws');

//npm run dev

//DEBUG
//var corsOptions = {
//  origin: "http://localhost:8081"
//};

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', function incoming(data) {
    wsServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send("refresh");
      }
    });
  });
});

app.use(express.static("public")); //Deploy
app.use(cors(corsOptions)); //DEBUG
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require("./app/routes/user.routes.js")(app);
require("./app/routes/task.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

/*
Kvůli tomu že heroku pokud se client odpojí z websocketu tak spadne aplikace tak každou vteřinu odešlu ze serveru zprávu aby Heroku si nemyslelo že aplikace spadla
*/
setInterval(() => {
  wsServer.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
