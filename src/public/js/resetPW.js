'use strict';

const newPassword = document.querySelector("#newPassword");
const confirmPassword = document.querySelector("#confirmPassword");
const submitBtn = document.querySelector('#submitButton');

submitBtn.addEventListener('click', submit);

function submit() {
  const req = {
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  };

  fetch('/resetPW', {
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
