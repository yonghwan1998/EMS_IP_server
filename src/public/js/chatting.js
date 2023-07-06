'use strict';

let socket = io();

socket.on('connect', () => {
  /* 접속됐을 때 실행 */
  let name = localStorage.getItem('name');

  /* 서버에 새로운 유저가 왔다고 알림 */
  socket.emit('newUser', name);
});

socket.on('update', (data) => {
  let chat = document.getElementById('chat');

  let message = document.createElement('div');
  let node = document.createTextNode(`${data.name}: ${data.message}`);
  let className = '';

  switch (data.type) {
    case 'message':
      className = 'other'
      break

    case 'connect':
      className = 'connect'
      break

    case 'disconnect':
      className = 'disconnect'
      break
  };

  message.classList.add(className);
  message.appendChild(node);
  chat.appendChild(message);
});

/* 전송함수 */
function send() {
  /* 입력돼있는 데이터 가져오기 */
  let message = document.getElementById('text').value;

  document.getElementById('text').value = '';

  let chat = document.getElementById('chat');
  let msg = document.createElement('div');
  let node = document.createTextNode(message);
  msg.classList.add('me');
  msg.appendChild(node);
  chat.appendChild(msg);

  socket.emit('message', { type: 'message', message: message });
}