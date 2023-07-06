'use strict';

const tel = document.querySelector('#tel');
const elderTel = document.querySelector('#elderTel');

const submitBtn = document.querySelector('#submitButton');

submitBtn.addEventListener('click', submit);

function submit() {
  const req = {
    tel: tel.value,
    elderTel: elderTel.value
  };

  fetch('/findID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        alert(res.msg);
        location.href = '/login';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.log(new Error('계정 찾기 중 에러 발생'));
    });
}
