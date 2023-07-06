'use strict';

// 모듈
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socket(server); // 생성된 서버를 socket.io에 바인딩

// 라우팅
const home = require('./routes');
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_DATABASE,
};

const sessionStore = new MySQLStore(options);

// 앱 세팅
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cors({
  origin: '*',
  credential: 'true'
}));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/img'));
app.use(express.static(__dirname + '/public/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({
  secret: 'abcdefghijklmnop',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));

/* on()은 소켓에서 해당 이벤트를 받으면 콜백함수가 실행된다  */
/* on은 수신, emit은 전송 */
io.sockets.on('connection', (socket) => {

  /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
  socket.on('newUser', (name) => {
    // console.log(name + ' 님이 접속 했습니다.');

    socket.name = name;

    /* 모든 소켓에게 전송 */
    io.sockets.emit('update', { type: 'connect', name: 'SYSTEM', message: name + '님이 접속했습니다.' });
  });

  /* 전송한 메시지 받기 */
  socket.on('message', (data) => {
    data.name = socket.name;

    console.log(data);

    /* 보낸 사람을 제외한 나머지 사람에게 메시지 전송 */
    socket.broadcast.emit('update', data);
  });

  socket.on('disconnect', () => {
    // console.log(socket.name + '님이 나가셨습니다.');

    socket.broadcast.emit('update', { type: 'disconnect', name: 'SYSTEM', message: socket.name + '님이 나가셨습니다.' });
  });
});

app.use('/', home);

module.exports = server;