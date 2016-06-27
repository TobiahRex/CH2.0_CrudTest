'use strict';

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGODB_URI || "mongodb://localhost/27jun16_CRUDtest"

const express = require('express');
const router = express.Router();
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socket1 = require('./socket_template');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', require('./server/routes/api'));
app.use('/', require('./server/routes/index'));

io.on('connection', (socket) => {
  console.log('Client connected');
  socket1.init(io, socket);
});

mongoose.connect(MONGOURL, err => {
  console.log(err || `MONGOURL @ ${MONGOURL}`);
})
server.listen(PORT, err => {
  console.log(err || `Server listening on PORT ${PORT}`);
});

module.exports = app;
