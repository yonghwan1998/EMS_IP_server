'use strict';

const id = document.querySelector('#id');
const tel = document.querySelector('#tel');
const elderTel = document.querySelector('#elderTel');
const sendBtn = document.querySelector('#sendButton');

const verificationCode = document.querySelector('#verificationCode');
const submitBtn = document.querySelector('#submitButton');

sendBtn.addEventListener('click', send);
submitBtn.addEventListener('click', submit);

function send() {
  const req = {
    id: id.value,
    tel: tel.value,
    elderTel: elderTel.value,
  };

  fetch('/sendVerificationCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        sendBtn.style.visibility = 'hidden';
        submitBtn.style.display = 'block';
        verificationCode.disabled = false;

        console.log(res.msg);
        alert('인증번호를 입력해주세요.');
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.log(new Error('비밀번호 찾기 중 에러 발생'));
    });

}

function submit() {
  const req = {
    verificationCode: verificationCode.value,
  };

  fetch('/confirmCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        location.href = '/resetPW';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.log(new Error('비밀번호 찾기 중 에러 발생'));
    });
}
