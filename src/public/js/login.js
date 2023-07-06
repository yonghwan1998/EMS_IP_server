'use strict';

const id = document.querySelector('#id');
const pw = document.querySelector('#pw');
const keep = document.querySelector('#keep');
const loginBtn = document.querySelector('#loginButton');

keep.addEventListener('click', keepOnOff);
loginBtn.addEventListener('click', login);

function keepOnOff() {
  if (keep.value === 'on') {
    keep.value = 'off';
  } else {
    keep.value = 'on';
  }
}

function login() {
  const req = {
    id: id.value,
    pw: pw.value,
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        localStorage.setItem('name', res.name);
        location.href = '/chatting';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.log(new Error('로그인 중 에러 발생'));
    });
}
