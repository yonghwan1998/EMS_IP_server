'use strict';

const id = document.querySelector('#id');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const tel = document.querySelector('#tel');
const elderTel = document.querySelector('#elderTel');
const address = document.querySelector('#address');
const detailedAddress = document.querySelector('#detailedAddress');

const signUpBtn = document.querySelector('#signUpButton');

signUpBtn.addEventListener('click', signUp);

function signUp() {

  const homeAddress = `${address.value} ${detailedAddress.value}`;
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  const regex = / /gi;

  const req = {
    id: id.value.replace(regex, ''),
    password: password.value.replace(regex, ''),
    passwordConfirm: passwordConfirm.value.replace(regex, ''),
    tel: tel.value.replace(regex, ''),
    elderTel: elderTel.value.replace(regex, ''),
    homeAddress: homeAddress,
  };

  if (req.id.length < 5 || req.id.length > 20) {
    alert('5~20자의 영문 소문자, 숫자를 이용한 아이디를 생성해 주세요.');
  } else if (req.id !== req.id.toLowerCase()) {
    alert('5~20자의 영문 소문자, 숫자를 이용한 아이디를 생성해 주세요.');
  } else if (special_pattern.test(req.id) === true) {
    alert('아이디에 특수문자가 입력되었습니다.');
  } else if (req.password.length < 8 || req.password.length > 16) {
    alert('8~16자 영문 대 소문자, 숫자, 특수문자를 이용한 비밀번호를 생성해 주세요.');
  } else if (req.password !== req.passwordConfirm) {
    alert('비밀번호를 다시 확인해 주세요.');
  } else {
    fetch('/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert(res.msg);
          location.href = '/login';
        } else {
          alert(res.msg);
        }
      })
      .catch((err) => {
        console.log(new Error('회원가입 중 에러 발생'));
      });
  }
}